from flask import Flask, render_template, send_from_directory
import os

app = Flask(
    __name__,
    template_folder="templates",
    static_folder="static"
)

# -------------------------
# Home Page
# -------------------------
@app.route("/")
def home():
    return render_template("index.html")


# -------------------------
# Browser Icon (favicon)
# -------------------------
@app.route("/favicon.ico")
def favicon():
    return send_from_directory(
        os.path.join(app.static_folder, "icons"),
        "favicon.ico",
        mimetype="image/vnd.microsoft.icon"
    )


# -------------------------
# Health Check
# Useful for Render
# -------------------------
@app.route("/health")
def health():
    return {
        "status": "running",
        "application": "Project Starlight",
        "framework": "Flask"
    }


# -------------------------
# Error Pages
# -------------------------
@app.errorhandler(404)
def page_not_found(error):
    return render_template("404.html"), 404


@app.errorhandler(500)
def internal_server_error(error):
    return render_template("500.html"), 500


# -------------------------
# Disable Browser Cache
# (Helpful while developing)
# -------------------------
@app.after_request
def add_header(response):
    response.headers["Cache-Control"] = (
        "no-store, no-cache, must-revalidate, "
        "post-check=0, pre-check=0, max-age=0"
    )
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "-1"
    return response


# -------------------------
# Run Application
# -------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(
        host="0.0.0.0",
        port=port,
        debug=True
    )