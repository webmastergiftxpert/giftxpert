"""GiftXpert backend API tests - categories, products, enquiries."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://xpert-staging.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

EXPECTED_CATEGORY_SLUGS = {
    "employee-gifting", "client-gifting", "festive-gifting", "promotional-gifts",
    "welcome-kits", "reward-recognition", "sustainable-gifting", "luxury-gifting",
    "wellness-gifting",
}


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_root(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        assert r.json().get("status") == "ok"


# ---------- Categories ----------
class TestCategories:
    def test_list_categories_returns_9(self, client):
        r = client.get(f"{API}/categories")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) == 9
        slugs = {c["slug"] for c in data}
        assert slugs == EXPECTED_CATEGORY_SLUGS
        for c in data:
            assert "_id" not in c
            assert len(c["subcategories"]) == 4
            for sc in c["subcategories"]:
                assert {"slug", "name", "description"} <= set(sc.keys())

    def test_get_category_by_slug(self, client):
        r = client.get(f"{API}/categories/employee-gifting")
        assert r.status_code == 200
        d = r.json()
        assert d["slug"] == "employee-gifting"
        assert d["name"] == "Employee Gifting"
        assert "_id" not in d

    def test_get_category_not_found(self, client):
        r = client.get(f"{API}/categories/does-not-exist")
        assert r.status_code == 404


# ---------- Products ----------
class TestProducts:
    def test_list_all_products(self, client):
        r = client.get(f"{API}/products")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) == 35
        for p in data:
            assert "_id" not in p
            assert p["slug"] and p["name"] and p["category_slug"]

    def test_filter_by_category(self, client):
        r = client.get(f"{API}/products", params={"category": "employee-gifting"})
        assert r.status_code == 200
        data = r.json()
        assert len(data) > 0
        assert all(p["category_slug"] == "employee-gifting" for p in data)

    def test_filter_by_category_and_subcategory(self, client):
        r = client.get(f"{API}/products", params={"category": "employee-gifting", "subcategory": "joining-kits"})
        assert r.status_code == 200
        data = r.json()
        assert len(data) >= 1
        for p in data:
            assert p["category_slug"] == "employee-gifting"
            assert p["subcategory_slug"] == "joining-kits"

    def test_get_product_detail(self, client):
        r = client.get(f"{API}/products/premium-joining-kit")
        assert r.status_code == 200
        d = r.json()
        assert d["slug"] == "premium-joining-kit"
        assert d["name"] == "Premium Joining Kit"
        assert isinstance(d["images"], list) and len(d["images"]) > 0
        assert isinstance(d["features"], list) and len(d["features"]) > 0
        assert isinstance(d["specifications"], list) and len(d["specifications"]) > 0
        assert d["moq"] and d["price_range"]
        assert "_id" not in d

    def test_get_product_not_found(self, client):
        r = client.get(f"{API}/products/non-existent-slug-xyz")
        assert r.status_code == 404


# ---------- Enquiries ----------
class TestEnquiries:
    created_id = None

    def test_create_enquiry_valid(self, client):
        payload = {
            "name": "TEST Automation User",
            "company": "TEST Corp",
            "phone": "+919999999999",
            "email": "test.automation@example.com",
            "requirement": "Looking for 100 Diwali hampers for employees.",
            "product_slug": "premium-joining-kit",
            "product_name": "Premium Joining Kit",
            "source": "automated-test",
        }
        r = client.post(f"{API}/enquiries", json=payload)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["id"]
        assert d["email"] == payload["email"]
        assert d["status"] == "new"
        assert d.get("created_at")
        assert "_id" not in d
        TestEnquiries.created_id = d["id"]

    def test_create_enquiry_invalid_email(self, client):
        payload = {
            "name": "Bad Email",
            "company": "X Co",
            "phone": "+911111111111",
            "email": "not-an-email",
            "requirement": "Something over five chars",
        }
        r = client.post(f"{API}/enquiries", json=payload)
        assert r.status_code in (400, 422)

    def test_create_enquiry_missing_fields(self, client):
        r = client.post(f"{API}/enquiries", json={"email": "a@b.com"})
        assert r.status_code in (400, 422)

    def test_list_enquiries_newest_first(self, client):
        r = client.get(f"{API}/enquiries")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) >= 1
        for e in data:
            assert "_id" not in e
        # Verify newest first
        if len(data) >= 2:
            assert data[0]["created_at"] >= data[1]["created_at"]
        # Verify our created enquiry is present
        if TestEnquiries.created_id:
            ids = [e["id"] for e in data]
            assert TestEnquiries.created_id in ids
