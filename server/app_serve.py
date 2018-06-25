import http.server
import os

PORT = 5000

if __name__ == '__main__':
    web_dir = os.path.join(os.path.dirname(__file__), '../dist')
    os.chdir(web_dir)

    Handler = http.server.SimpleHTTPRequestHandler
    httpd = socketserver.TCPServer(('', PORT), Handler)
    print('Serving at port ' + str(PORT))
    httpd.serve_forever()

