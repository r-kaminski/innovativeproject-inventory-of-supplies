from rest_framework_csv import renderers as r
from rest_framework.renderers import BaseRenderer
from fpdf import FPDF


class ReportCSVRenderer(r.CSVRenderer):
    header = ['ID', 'Date', 'Name', 'Supplies total',
              'Supplies scanned', 'Supply ID', 'Supply name', 'Found']


class ReportPdfRenderer(BaseRenderer):
    media_type = 'application/pdf'

    class ReportPdf(FPDF):
        def __init__(self, data):
            super().__init__()
            self.supplies = data
            self.set_auto_page_break(True, margin=40)

        def header(self):
            self.set_font("Arial", size=12)
            self.cell(0, 10, txt='inventory report id: %d' %
                      self.supplies['id'], align='L')
            self.set_x(0)
            self.cell(0, 10, txt=self.supplies['name'], align='C')
            self.set_x(0)
            self.cell(0, 10, txt=str(self.supplies['date']), align='R', ln=1)

        def footer(self):
            self.set_font('Arial', 'I', 10)
            self.set_y(-15)
            self.cell(0, 10, str(self.page_no()), 0, 0, 'C')

            self.set_xy(170, -20)
            self.cell(0, 10, txt='Signature', border='T', align='C')

    def table(self, pdf: FPDF, header: list, data):
        pdf.set_fill_color(200)
        pdf.set_line_width(.3)
        pdf.set_font('', 'B')
        w = [10, 160, 15]
        for i in range(len(header)):
            pdf.cell(w[i], 7, header[i], 1, 0, 'C')
        pdf.ln()
        pdf.set_font('')
        fill = False
        for row in data:
            if pdf.get_y() > 250:
                border = 'LRT'
            else:
                border = 'LR'
            pdf.cell(w[0], 6, str(row.inventory_supply.id),
                     border, 0, 'L', fill)
            pdf.cell(w[1], 6, row.inventory_supply.name, border, 0, 'L', fill)
            pdf.cell(w[2], 6, 'yes' if row.is_checked else 'no',
                     border, 0, 'L', fill)
            pdf.ln()
            fill = not fill
            if pdf.get_y() > 250:
                pdf.cell(sum(w), 0, '', 'T', 1)

        pdf.cell(sum(w), 0, '', 'T')

    def render(self, data, media_type=None, renderer_context=None):
        pdf = ReportPdfRenderer.ReportPdf(data)

        pdf.set_font("Arial", size=12)
        pdf.add_page()
        supplies = data['data']

        total = data['Supplies total']
        scanned = data['Supplies scanned']

        pdf.ln()
        pdf.cell(0, 10, txt='Supplies scanned: %d' % scanned, ln=1)
        pdf.cell(0, 10, txt='Supplies total: %d' % total, ln=1)
        pdf.cell(0, 10, txt='Supplies not found: %d' % (total - scanned), ln=1)

        self.table(pdf, ['id', 'name', 'found'], supplies)

        buf = pdf.output(dest='S').encode('latin-1')
        return buf
