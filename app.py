import pickle 
from flask import Flask, request, jsonify, render_template

app = Flask(__name__, template_folder="templates")

# Import ridge regressor model and standard scaler pickle
ridge_model = pickle.load(open("models/ridge.pkl", "rb"))
standard_scaler = pickle.load(open("models/scaler.pkl", "rb"))

# Route for home page
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/predictdata", methods=["POST"])
def predict_datapoint():
    try:
        Temperature = float(request.form.get("Temperature"))
        RH = float(request.form.get("RH"))
        Ws = float(request.form.get("Ws"))
        Rain = float(request.form.get("Rain"))
        FFMC = float(request.form.get("FFMC"))
        DMC = float(request.form.get("DMC"))
        ISI = float(request.form.get("ISI"))
        Classes = float(request.form.get("Classes"))
        Region = float(request.form.get("Region"))

        # Check for negative values
        if any(val < 0 for val in [Temperature, RH, Ws, Rain, FFMC, DMC, ISI, Classes, Region]):
            return jsonify({"error": "All input values must be non-negative."})

        new_data_scaled = standard_scaler.transform(
            [[Temperature, RH, Ws, Rain, FFMC, DMC, ISI, Classes, Region]]
        )
        result = ridge_model.predict(new_data_scaled)

        return jsonify({"result": result[0]})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)