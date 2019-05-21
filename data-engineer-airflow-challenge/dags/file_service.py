import os
from os import listdir
from os.path import isfile, join


TMP_DIRECTORY = '/tmp/tempus_challenge_dag'


def create_directory():
    try:
        os.mkdir(TMP_DIRECTORY)
    except FileExistsError:
        pass


def write(source_id, headline_data):
    f = open(f'{TMP_DIRECTORY}/{source_id}', 'w')
    f.write(headline_data)
    f.close()


def get_saved_files():
    return [f for f in listdir(TMP_DIRECTORY)
            if isfile(join(TMP_DIRECTORY, f))]


def delete_file(source_id):
    os.remove(f'{source_id}')
