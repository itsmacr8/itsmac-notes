from _utils import write_to_file, is_last_item


class Highlight_List:

    def populate_highlight_list(self, file):
        """Highlight list item from highlight_list_items list of model.py file."""
        from _model import highlight_list_items
        write_to_file(highlight_list_items, self, file)

    def get_list_item(self, list_items, list_item):
        """Return list item markup if it is able to find them by splitting ':' or '=' sign from the provided text."""
        try:
            highlight_text = list_item.split(':')[0]
            normal_text = list_item.split(':')[1]
        except IndexError:
            highlight_text = list_item.split(' =')[0]
            normal_text = list_item.split(' =')[1]
        li_tag = '<li>' if is_last_item(
            list_items, list_item) else '<li class="mb-1">'
        return f'{li_tag}<mark class="highlight">{highlight_text}:</mark>{normal_text}</li>'


class List:

    def populate_list(self, file):
        """Generate list item from list_items list of model.py file."""
        from _model import list_items
        write_to_file(list_items, self, file)

    def get_list_item(self, list_items, list_item):
        try:
            import re
            text = re.split('\d+. ', list_item)[1]
        except IndexError:
            text = list_item

        li_tag = '<li>' if is_last_item(
            list_items, list_item) else '<li class="mb-1">'
        return f'{li_tag}{text}</li>'
