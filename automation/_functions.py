def populate_questions(file, id_num):
    """
    *   Add questions to the questions list of model.py file according to the example.
    *   Change the section variable to 'b' or 'c' accordingly.
    *   Change the id_num from where you want to start the numbering of questions.
    """
    from _model import section, questions
    from _partials import get_link
    link = get_link(section)
    for question in questions:
        if len(question) > 2:
            write_to_file = f'<li class="individual-question"><a href="{link}{id_num}">{question}</a></li>'
            file.write(write_to_file)
            id_num += 1
        elif len(question) <= 2:
            question_a = question[0].strip()
            question_b = question[1].strip()
            write_to_file = f'<li class="individual-question"><ul><li><a href="{link}{id_num}">{question_a}</a></li><li><a href="{link}{id_num+1}">{question_b}</a></li></ul></li>'
            file.write(write_to_file)
            id_num += 2


def populate_table(file):
    """
    *   Add table data to the table list of model.py file according to the example.
    *   Change num_of_cols to the number of columns in the table.
    """
    from _model import table, num_of_cols
    for row in table:
        cell = 'th' if table[0] == row else 'td'
        col_1 = row.split("^")[0]
        col_2 = row.split("^")[1]
        if num_of_cols == 2:
            table_row = f'<tr><{cell}>{col_1}</{cell}><{cell}>{col_2}</{cell}></tr>'
        elif num_of_cols == 3:
            col_3 = row.split("^")[2]
            table_row = f'<tr><{cell}>{col_1}</{cell}><{cell}>{col_2}</{cell}><{cell}>{col_3}</{cell}></tr>'
        elif num_of_cols == 4:
            col_3 = row.split("^")[2]
            col_4 = row.split("^")[3]
            table_row = f'<tr><{cell}>{col_1}</{cell}><{cell}>{col_2}</{cell}><{cell}>{col_3}</{cell}><{cell}>{col_4}</{cell}></tr>'
        file.write(table_row)
