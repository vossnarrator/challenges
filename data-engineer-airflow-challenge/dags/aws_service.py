from datetime import datetime

import boto3

from config import AWS_SECRET_KEY, AWS_KEY, BUCKET_NAME
from file_service import TMP_DIRECTORY


# Given a source_id, make the file name, and push the data file to aws
def upload_file(source_id):
    now = datetime.now()
    pipeline_execution_date = datetime.strftime(now, '%Y-%m-%d')
    file_name = f'{pipeline_execution_date}_top_headlines'
    push_to_aws(source_id, file_name)


# Ensures that the bucket exists.  This does not throw errors if it already
# exists
def create_bucket():
    # this is instantiated here, and in 'push to aws' because I'm unsure about
    # the persistence of the object and the environment that is Apache Airflow
    s3 = boto3.client('s3', aws_access_key_id=AWS_KEY, aws_secret_access_key=AWS_SECRET_KEY)
    s3.create_bucket(Bucket=BUCKET_NAME)


# Given a source id, and the name of the file to push the data as,
# push the data file to S3
def push_to_aws(source_id, file_name):
    s3 = boto3.client('s3', aws_access_key_id=AWS_KEY, aws_secret_access_key=AWS_SECRET_KEY)
    with open(f'{TMP_DIRECTORY}/{source_id}', 'rb') as data:
        source_id = source_id.replace('.csv', '')
        s3.upload_fileobj(data, BUCKET_NAME, f'{source_id}/{file_name}.csv')
