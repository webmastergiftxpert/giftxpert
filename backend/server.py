from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from contextlib import asynccontextmanager

from seed_data import CATEGORIES, PRODUCTS

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


async def seed_database():
    """Seed categories and products if empty."""
    cat_count = await db.categories.count_documents({})
    if cat_count == 0:
        await db.categories.insert_many([{**c} for c in CATEGORIES])
        logger.info(f"Seeded {len(CATEGORIES)} categories")
    prod_count = await db.products.count_documents({})
    if prod_count == 0:
        await db.products.insert_many([{**p} for p in PRODUCTS])
        logger.info(f"Seeded {len(PRODUCTS)} products")


@asynccontextmanager
async def lifespan(app: FastAPI):
    await seed_database()
    yield
    client.close()


app = FastAPI(lifespan=lifespan)
api_router = APIRouter(prefix="/api")


# ============ MODELS ============
class Subcategory(BaseModel):
    slug: str
    name: str
    description: str
    image: Optional[str] = None


class Category(BaseModel):
    id: str
    slug: str
    name: str
    description: str
    image: str
    icon: str
    subcategories: List[Subcategory] = []


class Product(BaseModel):
    id: str
    slug: str
    name: str
    category_slug: str
    subcategory_slug: Optional[str] = None
    short_description: str
    description: str
    features: List[str] = []
    specifications: List[str] = []
    customization: str
    moq: str
    price_range: str
    images: List[str] = []


class EnquiryCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    company: str = Field(..., min_length=1, max_length=120)
    phone: str = Field(..., min_length=6, max_length=20)
    email: EmailStr
    requirement: str = Field(..., min_length=5, max_length=2000)
    product_slug: Optional[str] = None
    product_name: Optional[str] = None
    source: Optional[str] = "website"


class Enquiry(EnquiryCreate):
    id: str
    created_at: str
    status: str = "new"


# ============ ROUTES ============
@api_router.get("/")
async def root():
    return {"message": "GiftXpert API", "status": "ok"}


@api_router.get("/categories", response_model=List[Category])
async def list_categories():
    cats = await db.categories.find({}, {"_id": 0}).to_list(100)
    return cats


@api_router.get("/categories/{slug}", response_model=Category)
async def get_category(slug: str):
    cat = await db.categories.find_one({"slug": slug}, {"_id": 0})
    if not cat:
        raise HTTPException(status_code=404, detail="Category not found")
    return cat


@api_router.get("/products", response_model=List[Product])
async def list_products(category: Optional[str] = None, subcategory: Optional[str] = None, limit: int = 100):
    q = {}
    if category:
        q["category_slug"] = category
    if subcategory:
        q["subcategory_slug"] = subcategory
    products = await db.products.find(q, {"_id": 0}).to_list(limit)
    return products


@api_router.get("/products/{slug}", response_model=Product)
async def get_product(slug: str):
    p = await db.products.find_one({"slug": slug}, {"_id": 0})
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    return p


@api_router.post("/enquiries", response_model=Enquiry)
async def create_enquiry(payload: EnquiryCreate):
    doc = payload.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    doc["status"] = "new"
    await db.enquiries.insert_one({**doc})
    logger.info(f"New enquiry received from {doc['email']} ({doc['company']})")
    # Strip any _id that motor might have mutated in
    doc.pop("_id", None)
    return doc


@api_router.get("/enquiries", response_model=List[Enquiry])
async def list_enquiries(limit: int = 200):
    enquiries = await db.enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return enquiries


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
