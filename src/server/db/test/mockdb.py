import json
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import declarative_base, sessionmaker

Base = declarative_base()

def create_mock_db(file_path):
    with open(file_path, "r") as file:
        mock_data = json.load(file)

    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()

    # Load mock data into the in-memory SQLite database
    for table, records in mock_data.items():
        table_class = Base.classes.get(table)
        if table_class:
            session.bulk_insert_mappings(table_class, records)
            session.commit()

    return engine
