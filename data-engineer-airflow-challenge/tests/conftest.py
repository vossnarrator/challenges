import inspect
import sys

# This is not the recommended way to add python files to a path for testing
# But I don't currently understand the environment architecture of Airflow
# when it comes to testing.

conftest_location = inspect.stack()[0][1]
dags_location = '/'.join(conftest_location.split('/')[:-2])
service_location = dags_location + '/dags'
sys.path.append(service_location)
