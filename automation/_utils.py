def write_to_file(list_items, class_name, file):
    list_item = ''
    for item in list_items:
        list_item_markup = class_name.get_list_item(list_items, item)
        if list_item_markup is not None:
            list_item += list_item_markup
    file.write(f'<ol>{list_item}</ol>')


def is_last_item(list_items, list_item):
    return list_items[-1] == list_item
