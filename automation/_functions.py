def populate_table(file):
    """Add table data from table list of model.py."""
    from _model import table
    from _partials import get_row
    for data in table:
        tag = 'th' if table[0] == data else 'td'
        row = get_row(data, tag)
        file.write(row)


def populate_highlight_list(file):
    """Highlight list item from highlight_list_items list of model.py file."""
    from _model import highlight_list_items
    from _partials import get_list_item
    for item in highlight_list_items:
        list_item = get_list_item(item)
        file.write(list_item)


def populate_paragraphs(file):
    """Generate paragraph element from paragraphs list of model.py file."""
    from _model import paragraphs
    for paragraph in paragraphs:
        file.write(f'<p>{paragraph}</p>')
