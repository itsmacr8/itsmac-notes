import os

dirpath = os.path.dirname(__file__)
filename = '_populate.html'
filepath = os.path.join(dirpath, filename).replace("\\", "/")

populate_model = input(
    'What do you want to populate? Type "T" for Table Model or "Q" for Question Model\n').lower()

# NOTE: Question Model
if populate_model == 'q':
    with open(filepath, mode="a", encoding="UTF-8") as file:
        from _functions import populate_questions
        populate_questions(file, id_num=1)
# NOTE: Table Model
elif populate_model == 't':
    with open(filepath, mode="a", encoding="UTF-8") as file:
        from _functions import populate_table
        populate_table(file)
