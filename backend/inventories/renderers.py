from rest_framework_csv import renderers as r

class ReportCSVRenderer(r.CSVRenderer):

    header = ['ID', 'Date', 'Name', 'Supply ID', 'Supply name', 'Checked out']