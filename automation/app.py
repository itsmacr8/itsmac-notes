import os

dirpath = os.path.dirname(__file__)
filename = '_populate.html'
filepath = os.path.join(dirpath, filename).replace("\\", "/")


# input_text = input('Type "HLM" for Highlight List Model or "LM" for Highlight List Model.\n')
input_text = 'HLM'
populate_model = input_text.lower()


# NOTE: Highlight List Model
if populate_model == 'hlm':
    with open(filepath, mode="a", encoding="UTF-8") as file:
        from _classes import Highlight_List
        highlight_list = Highlight_List()
        highlight_list.populate_highlight_list(file)

# NOTE: Highlight List Model
elif populate_model == 'lm':
    with open(filepath, mode="a", encoding="UTF-8") as file:
        from _classes import List
        list_ = List()
        list_.populate_list(file)
