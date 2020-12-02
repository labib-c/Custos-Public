from server.app import app

def test_example():
    sut = app.test_client()
    res = sut.get("/ping")
    assert res.status_code == 200
