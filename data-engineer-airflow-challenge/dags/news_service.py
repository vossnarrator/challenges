import math

from newsapi import NewsApiClient
from newsapi.newsapi_exception import NewsAPIException

import aws_service
import file_service
from config import NEWS_API_KEY

# @TODO figure out if this can be persisted
newsapi = NewsApiClient(api_key=NEWS_API_KEY)


def save_headlines():
    sources = get_sources()
    # ensure folder to dump csvs in exists
    file_service.create_directory()
    for source_id in sources:
        titles = ['headlines'] + get_titles(source_id)
        headline_data = '\n'.join(titles)
        file_service.write(source_id, headline_data)
    return sources


def get_sources():
    try:
        source_response = newsapi.get_sources(language='en')
        return [source['id'] for source in source_response['sources']]
    except (NewsAPIException, KeyError):
        return []


def get_titles(source_id):
    articles = []
    try:
        top_headlines_response = newsapi.get_top_headlines(sources=source_id,
                                                           language='en',
                                                           page_size=100)
        articles.extend(top_headlines_response['articles'])
        article_count = top_headlines_response['totalResults']
        # this will query for articles backwards.  If there are 9 pages, it'll
        # query for page 9, then page 8, until page 2.
        while len(articles) < article_count:
            page = get_page_count(articles, article_count)
            top_headlines_response = newsapi.get_top_headlines(sources=source_id,
                                                               language='en',
                                                               page_size=100,
                                                               page=page)
            articles.extend(top_headlines_response['articles'])
    except (KeyError, NewsAPIException):
        pass
    return ['"' + article['title'] + '"' for article in articles]


# @TODO add test to make sure this works
def get_page_count(articles, article_count):
    # if there are 901 total articles, but only 100 have been retrieved
    # output 9 for page 9.
    return math.ceil((article_count - len(articles)) / 100)


def upload_csvs():
    file_names = file_service.get_saved_files()
    aws_service.create_bucket()
    for file_name in file_names:
        aws_service.upload_file(file_name)
