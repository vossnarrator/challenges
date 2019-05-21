"""Simple DAG that uses a few python operators."""
from datetime import datetime, timedelta

from airflow import DAG
from airflow.operators.python_operator import PythonOperator

import news_service

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2018, 4, 1),
    'email': ['airflow@airflow.com'],
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    'tempus_challenge_dag',
    default_args=default_args,
    schedule_interval=timedelta(minutes=5),  # DAG will run once every 5 minutes
    catchup=False,
)

"""
Possible exceptions/errors:
NewsAPIException
- when the NewsAPI fails due to too many requests, or accessing a page but
  having a 'limited' account

KeyError
- if/when the NewsAPI response changes, the task won't fail.
  @TODO add logging for when this happens

FileExistsError
- Happens when creating the temporary directory to store the files.  This
  case is handled.

No more space on Disk
- file_service.write will most certainly fail if there is no more room left on
  the disk.
"""
create_csvs = PythonOperator(
    task_id='create_csvs',
    default_args=default_args,
    python_callable=news_service.save_headlines,
    dag=dag
)

"""
Possible exceptions/errors:
Invalid aws keys
- When a user specifies an incorrect AWS Key, the tasks won't work

S3 upload failed
- If the s3 upload task fails, the other files won't get pushed.
  @TODO add exception checking, and attempt to push other files if error is
  found
"""
upload_csvs = PythonOperator(
    task_id='upload_csvs',
    default_args=default_args,
    python_callable=news_service.upload_csvs,
    dag=dag
)

# Sets the creation task of csvs as a dependency before upload
create_csvs >> upload_csvs
