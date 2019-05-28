from rest_framework_csv import renderers as r

class ReportCSVRenderer(r.CSVRenderer):

    header = ['ID', 'Date', 'Name', 'Supplies total', 'Supplies scanned', 'Supply ID', 'Supply name', 'Found']