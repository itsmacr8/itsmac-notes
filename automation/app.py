import os

dirpath = os.path.dirname(__file__)
filename = '_populate.html'
filepath = os.path.join(dirpath, filename).replace("\\", "/")


input_text = 'Type "T" for Table Model or "Q" for Question Model or "H" for Highlight List Model or "P" for Paragraph Model.\n'
# populate_model = 'h'
populate_model = input(input_text).lower()


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

# NOTE: Highlight List Model
elif populate_model == 'h':
    with open(filepath, mode="a", encoding="UTF-8") as file:
        from _functions import populate_highlight_list
        populate_highlight_list(file)

# NOTE: Paragraph Model
elif populate_model == 'p':
    with open(filepath, mode="a", encoding="UTF-8") as file:
        from _functions import populate_paragraphs
        populate_paragraphs(file)
