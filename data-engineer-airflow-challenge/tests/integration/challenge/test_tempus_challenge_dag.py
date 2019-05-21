# import news_service
import os
from datetime import datetime

from mock import patch

import aws_service, file_service, news_service
from file_service import TMP_DIRECTORY
from news_service import newsapi

SOURCE_ID = 'fake_source_id'
HEADLINE_TITLE = 'fake_headline_title'


def get_example_source_response():
    return {
        'sources': [{
            'id': SOURCE_ID
        }]
    }


def get_example_headline_response():
    return {
        'articles': [{
            'title': HEADLINE_TITLE
        }],
        'totalResults': 1
    }


def get_expected_file_data():
    return f'"{HEADLINE_TITLE}"'


@patch.object(os, 'mkdir')
@patch.object(newsapi, 'get_sources', side_effect=[get_example_source_response()])
@patch.object(file_service, 'write')
@patch.object(newsapi, 'get_top_headlines', side_effect=[get_example_headline_response()])
def test_save_headlines_happy_path(_, file_service_write_patch, __, os_patch):
    # NO GIVEN

    news_service.save_headlines()

    os_patch.assert_called_with(TMP_DIRECTORY)
    file_service_write_patch.assert_called_with(SOURCE_ID, f'headlines\n"{HEADLINE_TITLE}"')


# @TODO add test for over 100 articles returned
# @TODO add test for failed news api call
# @TODO auto patch boto3 in conftest


@patch.object(file_service, 'get_saved_files', side_effect=[[SOURCE_ID]])
@patch.object(aws_service, 'create_bucket')
@patch.object(aws_service, 'push_to_aws')
def test_upload_csvs_happy_path(aws_push_patch, create_bucket_patch, _):
    now = datetime.now()
    pipeline_execution_date = datetime.strftime(now, '%Y-%m-%d')
    file_name = f'{pipeline_execution_date}_top_headlines'

    news_service.upload_csvs()

    create_bucket_patch.assert_called_once()
    aws_push_patch.assert_called_with(SOURCE_ID, file_name)
