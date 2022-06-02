class Question_Model:
    """
    *   Change the section variable to 'b' or 'c' accordingly.
    *   Change the id_num from where you want to start the numbering of questions.
    """

    def __init__(self, section, id_num) -> None:
        self.section = section
        self.id_num = id_num

    def populate_questions(self, file):
        """Add questions from the questions list of model.py."""
        from _model import questions
        for question in questions:
            link_question = self.get_link_question(question)
            file.write(link_question)

    def get_link_question(self, question):
        """Get question and make it a list item as well as add id number to it."""
        link = '#question-' if self.section == 'b' else '#question-sc-'
        if len(question) > 2:
            link_question = f'<li class="individual-question"><a href="{link}{self.id_num}">{question}</a></li>'
            self.id_num += 1
            return link_question
        question_a = question[0].strip()
        question_b = question[1].strip()
        link_question = f'<li class="individual-question"><ul><li><a href="{link}{self.id_num}">{question_a}</a></li><li><a href="{link}{self.id_num+1}">{question_b}</a></li></ul></li>'
        self.id_num += 2
        return link_question
