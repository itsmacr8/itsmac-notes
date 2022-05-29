def get_list_item(item):
    """Change num_of_cols to the number of columns of the table from the model.py file."""
    try:
        highlight_text = item.split('):')[0]
        normal_text = item.split('):')[1]
        list_item = f'<li class="individual-question"><mark class="highlight">{highlight_text}):</mark>{normal_text}</li>'
    except IndexError:
        highlight_text = item.split(': ')[0]
        normal_text = item.split(': ')[1]
        list_item = f'<li class="individual-question"><mark class="highlight">{highlight_text}:</mark>{normal_text}</li>'
    return list_item


def get_row(data, tag):
    """Get data from a table and process it and return it as a meaning row data."""
    col_1 = data.split("**")[0]
    col_2 = data.split("**")[1]
    from _model import num_of_cols
    if num_of_cols == 2:
        row = f'<tr><{tag}>{col_1}</{tag}><{tag}>{col_2}</{tag}></tr>'
    elif num_of_cols == 3:
        col_3 = data.split("**")[2]
        row = f'<tr><{tag}>{col_1}</{tag}><{tag}>{col_2}</{tag}><{tag}>{col_3}</{tag}></tr>'
    elif num_of_cols == 4:
        col_3 = data.split("**")[2]
        col_4 = data.split("**")[3]
        row = f'<tr><{tag}>{col_1}</{tag}><{tag}>{col_2}</{tag}><{tag}>{col_3}</{tag}><{tag}>{col_4}</{tag}></tr>'
    return row


def get_link_question(id_num, question):
    """
    *   Get question and make it a list item as well as add id number to it.
    *   Change the section variable to 'b' or 'c' accordingly.
    """
    from _model import section
    link = '#question-' if section == 'b' else '#question-sc-'
    if len(question) > 2:
        link_question = f'<li class="individual-question"><a href="{link}{id_num}">{question}</a></li>'
        id_num += 1
    elif len(question) <= 2:
        question_a = question[0].strip()
        question_b = question[1].strip()
        link_question = f'<li class="individual-question"><ul><li><a href="{link}{id_num}">{question_a}</a></li><li><a href="{link}{id_num+1}">{question_b}</a></li></ul></li>'
        id_num += 2
    return link_question
