# BikerTown

BikerTown is an application that allows Biker to create plans with other bikers to travel around Vietnam. This application supports a google map guidance system with an integrated to-do list that suggests gas stations and stops for bikers for their trips.

## Installation
1. Make sure Python is installed on your local machine, you can get the latest of python [here](https://www.python.org/downloads/):

2. Clone the project:
```bash
git clone https://github.com/DienNH2902/BikerTown.git
```

3. Navigate to the project directory:
```bash
cd repo-path
```

4. Switch to the backend branch to pull backend code:
```bash
git checkout -b backend origin/backend
```

5. Create a virtual environment:
```bash
py -m venv venv
```

6. Activate the virtual environment:
```bash
venv\Scripts\activate
```

7. Install the requirements for the application:
```bash
pip install -r requirements.txt
```

8. To configure database setup, create a .env file and enter:
```bash
DATABASE_URL="[your database url]"
```

## Usage

```python
uvicorn app_controller.py
```
