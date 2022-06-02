def get_list_item(item):
    """Get an item, process it and return as an HTML list item."""
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
