window.onload = function () {
    if (sessionStorage.getItem("hasCodeRunBeforeo") === null) {
        /** Your code here. **/
        sessionStorage.setItem("hasCodeRunBeforeo", true);
    }
}

function Calculate() {
    var velocity;
    var radius;
    var mass1;
    var mass2;
    var angle;
    var rmass;
    var unitv;
    var unitr;
    var unit1;
    var unit2;
    var energy;
    var amomentum;
    var gparameter;
    var h;
    var eccentricity;
    var shape;
    var drawvalues = [];
    var vescape;
    var vperfect;
    var vexcess;
    var rmax;
    var rmin;
    var sma;
    var smao;
    var smn;
    var vmax;
    var vmin;
    var vavg;
    var period;
    var circum;
    const G = 6.6743e-11;
    const pi = 3.14159265358979323846;

    GetPresets();

    velocity = document.getElementById("velocity").value;
    radius = document.getElementById("radius").value;
    mass1 = document.getElementById("mass1").value;
    mass2 = document.getElementById("mass2").value;
    angle = document.getElementById("angle").value;
    unitv = document.getElementById("unitv").value;
    unitr = document.getElementById("unitr").value;
    unit1 = document.getElementById("unit1").value;
    unit2 = document.getElementById("unit2").value;

    sessionStorage.setItem("velocity", velocity);
    sessionStorage.setItem("radius", radius);
    sessionStorage.setItem("mass1", mass1);
    sessionStorage.setItem("mass2", mass2);
    sessionStorage.setItem("angle", angle);
    sessionStorage.setItem("name1", document.getElementById("name1").value);
    sessionStorage.setItem("name2", document.getElementById("name2").value);
    sessionStorage.setItem("outputve", document.getElementById("outputve").value);
    sessionStorage.setItem("outputvp", document.getElementById("outputvp").value);
    sessionStorage.setItem("outputvav", document.getElementById("outputvav").value);
    sessionStorage.setItem("outputp", document.getElementById("outputp").value);
    sessionStorage.setItem("outputvex", document.getElementById("outputvex").value);
    sessionStorage.setItem("outputsma", document.getElementById("outputsma").value);
    sessionStorage.setItem("outputsmn", document.getElementById("outputsmn").value);
    sessionStorage.setItem("outputrmin", document.getElementById("outputrmin").value);
    sessionStorage.setItem("outputrmax", document.getElementById("outputrmax").value);
    sessionStorage.setItem("outputvmax", document.getElementById("outputvmax").value);
    sessionStorage.setItem("outputvmin", document.getElementById("outputvmin").value);
    sessionStorage.setItem("outputcircum", document.getElementById("outputcircum").value);
    sessionStorage.setItem("unitv", unitv);
    sessionStorage.setItem("unitr", unitr);
    sessionStorage.setItem("unit1", unit1);
    sessionStorage.setItem("unit2", unit2);

    if ((velocity === "") || (radius === "") || (mass1 === "") || (mass2 === "") || (angle === "")) {
        return;
    }

    velocity = Number(velocity);
    velocity = UnitConversion(velocity, unitv, "velocity");

    radius = Number(radius);
    radius = UnitConversion(radius, unitr, "distance");

    mass1 = Number(mass1);
    mass1 = UnitConversion(mass1, unit1, "mass");

    mass2 = Number(mass2);
    mass2 = UnitConversion(mass2, unit2, "mass");

    angle = Number(angle);

    if ((Number.isNaN(velocity) || Number.isNaN(radius) || Number.isNaN(mass1) || Number.isNaN(mass2)) || Number.isNaN(angle) || ((velocity <= 0 ) || (radius <= 0 ) || (mass1 <= 0) || (mass2 <=0))) {
        alert("Please input positive numbers only");
        document.getElementById("e").innerHTML = "Eccentricity: ";
        document.getElementById("s").innerHTML = "Shape: ";
        document.getElementById("v").innerHTML = "Escape Velocity: ";
        document.getElementById("p").innerHTML = "Velocity required for circular orbit: ";
        document.getElementById("ex").innerHTML = "Hyperbolic Excess Velocity: ";
        document.getElementById("av").innerHTML = "Average Orbital Velocity: ";
        document.getElementById("period").innerHTML = "Orbital Period: ";
        document.getElementById("sma").innerHTML = "Semi-major Axis: ";
        document.getElementById("smn").innerHTML = "Semi-minor Axis: ";
        document.getElementById("rmin").innerHTML = "Perihelion Distance: ";
        document.getElementById("rmax").innerHTML = "Aphelion Distance: ";
        document.getElementById("vmax").innerHTML = "Max. Orbital Velocity: ";
        document.getElementById("vmin").innerHTML = "Min. Orbital Velocity: ";
        document.getElementById("circum").innerHTML = "Orbital Circumference: ";
        return;
    }

    if (velocity > 299792458) {
        alert("You cannot input speeds faster than the speed of light");
        document.getElementById("e").innerHTML = "Eccentricity: ";
        document.getElementById("s").innerHTML = "Shape: ";
        document.getElementById("v").innerHTML = "Escape Velocity: ";
        document.getElementById("p").innerHTML = "Velocity required for circular orbit: ";
        document.getElementById("ex").innerHTML = "Hyperbolic Excess Velocity: ";
        document.getElementById("av").innerHTML = "Average Orbital Velocity: ";
        document.getElementById("period").innerHTML = "Orbital Period: ";
        document.getElementById("sma").innerHTML = "Semi-major Axis: ";
        document.getElementById("smn").innerHTML = "Semi-minor Axis: ";
        document.getElementById("rmin").innerHTML = "Perihelion Distance: ";
        document.getElementById("rmax").innerHTML = "Aphelion Distance: ";
        document.getElementById("vmax").innerHTML = "Max. Orbital Velocity: ";
        document.getElementById("vmin").innerHTML = "Min. Orbital Velocity: ";
        document.getElementById("circum").innerHTML = "Orbital Circumference: ";
        return;
    }

    if ((angle <= 0) || (angle >= 180)) {
        alert("Please input an angle in the range 0 < x < 180 degrees");
        document.getElementById("e").innerHTML = "Eccentricity: ";
        document.getElementById("s").innerHTML = "Shape: ";
        document.getElementById("v").innerHTML = "Escape Velocity: ";
        document.getElementById("p").innerHTML = "Velocity required for circular orbit: ";
        document.getElementById("ex").innerHTML = "Hyperbolic Excess Velocity: ";
        document.getElementById("av").innerHTML = "Average Orbital Velocity: ";
        document.getElementById("period").innerHTML = "Orbital Period: ";
        document.getElementById("sma").innerHTML = "Semi-major Axis: ";
        document.getElementById("smn").innerHTML = "Semi-minor Axis: ";
        document.getElementById("rmin").innerHTML = "Perihelion Distance: ";
        document.getElementById("rmax").innerHTML = "Aphelion Distance: ";
        document.getElementById("vmax").innerHTML = "Max. Orbital Velocity: ";
        document.getElementById("vmin").innerHTML = "Min. Orbital Velocity: ";
        document.getElementById("circum").innerHTML = "Orbital Circumference: ";
        return;
    }

    if (mass2 >= mass1) {
        alert("The first mass must be larger than the second");
        document.getElementById("e").innerHTML = "Eccentricity: ";
        document.getElementById("s").innerHTML = "Shape: ";
        document.getElementById("v").innerHTML = "Escape Velocity: ";
        document.getElementById("p").innerHTML = "Velocity required for circular orbit: ";
        document.getElementById("ex").innerHTML = "Hyperbolic Excess Velocity: ";
        document.getElementById("av").innerHTML = "Average Orbital Velocity: ";
        document.getElementById("period").innerHTML = "Orbital Period: ";
        document.getElementById("sma").innerHTML = "Semi-major Axis: ";
        document.getElementById("smn").innerHTML = "Semi-minor Axis: ";
        document.getElementById("rmin").innerHTML = "Perihelion Distance: ";
        document.getElementById("rmax").innerHTML = "Aphelion Distance: ";
        document.getElementById("vmax").innerHTML = "Max. Orbital Velocity: ";
        document.getElementById("vmin").innerHTML = "Min. Orbital Velocity: ";
        document.getElementById("circum").innerHTML = "Orbital Circumference: ";
        return;
    }

    rmass = (mass2*mass1)/(mass2+mass1);

    gparameter = G*mass1*mass2;
    energy = (0.5*rmass*velocity*velocity) - (gparameter/radius);
    amomentum = (rmass*velocity*radius*Math.sin((angle*pi)/180));

    eccentricity = Math.sqrt(1+((2*energy*amomentum*amomentum)/(rmass*gparameter*gparameter)));
    if (Number.isNaN(eccentricity)) {
        eccentricity = 0;
    }

    rmin = (amomentum*amomentum)/(rmass*gparameter*(1+eccentricity));
    vmax = amomentum/(rmass*rmin);
    if (eccentricity < 1) {
        rmax = (amomentum*amomentum)/(rmass*gparameter*(1-eccentricity));
        sma = (rmax+rmin)/2;
        smn = sma*Math.sqrt(1-eccentricity*eccentricity);
        vmin = amomentum/(rmass*rmax);
        period = 2*pi*Math.sqrt((sma**3)/(G*(mass1+mass2)));
        vavg = ((2*pi*sma)/period)*(1-(1/4)*(eccentricity**2)-(3/64)*(eccentricity**4)-(5/256)*(eccentricity**6)-(175/16384)*(eccentricity**8));
        h = ((sma-smn)**2)/((sma+smn)**2);
        circum = pi*(sma+smn)*(1+(1/4)*(h)+(1/64)*(h**2)+(1/256)*(h**3)+(25/16384)*(h**4));
        vavg = UnitConversion(vavg, document.getElementById("outputvav").value, "velocityo");
        period = UnitConversion(period, document.getElementById("outputp").value, "time");
        smao = sma
        sma = UnitConversion(sma, document.getElementById("outputsma").value, "distanceo");
        smn = UnitConversion(smn, document.getElementById("outputsmn").value, "distanceo");
        rmax = UnitConversion(rmax, document.getElementById("outputrmax").value, "distanceo");
        vmin = UnitConversion(vmin, document.getElementById("outputvmin").value, "velocityo");
        circum = UnitConversion(circum, document.getElementById("outputcircum").value, "distanceo");
    } else {
        rmax = "Orbit not closed";
        sma = "Orbit not closed";
        smn = "Orbit not closed";
        vmin = "Orbit not closed";
        period = "Orbit not closed";
        vavg = "Orbit not closed";
        circum = "Orbit not closed";
    }

    if (eccentricity == 0) {
        shape = "Circular";
        drawvalues[0] = radius;
    } else if (eccentricity < 0.1){
        shape = "Slightly Elliptical";
        drawvalues[0] = (smao/rmin);
        drawvalues[1] = eccentricity;
    } else if (eccentricity < 0.9) {
        shape = "Elliptical";
        drawvalues[0] = (smao/rmin);
        drawvalues[1] = eccentricity;
    } else if (eccentricity < 1) {
        shape = "Highly Elliptical";
        drawvalues[0] = (smao/rmin);
        drawvalues[1] = eccentricity;
    } else if (eccentricity == 1) {
        shape = "Parabolic";
    } else if (eccentricity > 1) {
        shape = "Hyperbolic";
        drawvalues[0] = eccentricity;
    }

    vescape = Math.sqrt((2*gparameter)/(radius*rmass));
    vperfect = vescape/(Math.sqrt(2));
    if (eccentricity == 1) {
        vexcess = 0;
    } else {
        vexcess = Math.sqrt(velocity*velocity-vescape*vescape);
    }

    vescape = UnitConversion(vescape, document.getElementById("outputve").value, "velocityo");
    vperfect = UnitConversion(vperfect, document.getElementById("outputvp").value, "velocityo");
    vexcess = UnitConversion(vexcess, document.getElementById("outputvex").value, "velocityo");
    rmin = UnitConversion(rmin, document.getElementById("outputrmin").value, "distanceo");
    vmax = UnitConversion(vmax, document.getElementById("outputvmax").value, "velocityo");

    document.getElementById("e").innerHTML = "Eccentricity: " + eccentricity;
    document.getElementById("s").innerHTML = "Shape: " + shape;
    document.getElementById("v").innerHTML = "Escape Velocity: " + vescape;
    document.getElementById("av").innerHTML = "Average Orbital Velocity: " + vavg;
    document.getElementById("period").innerHTML = "Orbital Period: " + period;
    document.getElementById("sma").innerHTML = "Semi-major Axis: " + sma;
    document.getElementById("smn").innerHTML = "Semi-minor Axis: " + smn;
    document.getElementById("rmin").innerHTML = "Perihelion Distance: " + rmin;
    document.getElementById("rmax").innerHTML = "Aphelion Distance: " + rmax;
    document.getElementById("vmax").innerHTML = "Max. Orbital Velocity: " + vmax;
    document.getElementById("vmin").innerHTML = "Min. Orbital Velocity: " + vmin;
    document.getElementById("circum").innerHTML = "Orbital Circumference: " + circum;
    if (angle == 90) {
        document.getElementById("p").innerHTML = "Velocity required for circular orbit: " + vperfect;
    } else {
        document.getElementById("p").innerHTML = "Velocity required for circular orbit: Angle must be 90&deg;";
    }
    if (eccentricity >= 1) {
        document.getElementById("ex").innerHTML = "Hyperbolic Excess Velocity: " + vexcess;
    } else {
        document.getElementById("ex").innerHTML = "Hyperbolic Excess Velocity: Closed orbit";
    }

    Draw(shape, drawvalues);
}

function Draw(shape, inputs) {
    var name1;
    var name2;
    if (document.getElementById("name1").value == "") {
        name1 = "Object 1";
    } else {
        name1 = document.getElementById("name1").value;
    }
    if (document.getElementById("name2").value == "") {
        name2 = "Object 2";
    } else {
        name2 = document.getElementById("name2").value;
    }

    for(el in board.objects) {
        board.removeObject(board.objects[el]);
       }

    switch(shape) {
        case "Circular":
            var center = board.create('point',[0,0], {name:name1,size: 15, face: 'o', zoom: true, fillColor: 'yellow', strokeColor: 'yellow'});
            var outerp = board.create('point',[-5,0], {name:name2,size: 4, face: 'o', zoom: true, fillColor: 'brown', strokeColor: 'brown'});
            var circle = board.create('circle',[center,outerp], {strokeWidth:2,strokeColor:'#000000'});
            break;
        case "Slightly Elliptical":
            var smas = 5*inputs[0];
            var smns = smas*Math.sqrt(1-inputs[1]*inputs[1]);
            var exfocus1s = 0;
            var exfocus2s = 2*Math.sqrt(smas*smas-smns*smns);
            var efocus1s = board.create("point",[exfocus1s,0], {name:name1,size: 15, face: 'o', zoom: true, fillColor: 'yellow', strokeColor: 'yellow'});
            var efocus2s = board.create("point",[exfocus2s,0], {name:'',size: 0, face: 'o', zoom: true});
            var epoints = board.create("point",[-5,0], {name:name2,size: 4, face: 'o', zoom: true, fillColor: 'brown', strokeColor: 'brown'});
            var ellipses = board.create("ellipse",[efocus1s,efocus2s,epoints], {strokeWidth:2,strokeColor:'#000000'});
            break;
        case "Elliptical":
            var sma = 5*inputs[0];
            var smn = sma*Math.sqrt(1-inputs[1]*inputs[1]);
            var exfocus1 = 0;
            var exfocus2 = 2*Math.sqrt(sma*sma-smn*smn);
            var efocus1 = board.create("point",[exfocus1,0], {name:name1,size: 15, face: 'o', zoom: true, fillColor: 'yellow', strokeColor: 'yellow'});
            var efocus2 = board.create("point",[exfocus2,0], {name:'',size: 0, face: 'o', zoom: true});
            var epoint = board.create("point",[-5,0], {name:name2,size: 4, face: 'o', zoom: true, fillColor: 'brown', strokeColor: 'brown'});
            var ellipse = board.create("ellipse",[efocus1,efocus2,epoint], {strokeWidth:2,strokeColor:'#000000'});
            break;
        case "Highly Elliptical":
            var smah = 5*inputs[0];
            var smnh = smah*Math.sqrt(1-inputs[1]*inputs[1]);
            var exfocus1h = 0;
            var exfcous2h = 2*Math.sqrt(smah*smah-smnh*smnh);
            var efocus1h = board.create("point",[exfocus1h,0], {name:name1,size: 15, face: 'o', zoom: true, fillColor: 'yellow', strokeColor: 'yellow'});
            var efocus2h = board.create("point",[exfcous2h,0], {name:'',size: 0, face: 'o', zoom: true});
            var epointh = board.create("point",[-5,0], {name:name2,size: 4, face: 'o', zoom: true, fillColor: 'brown', strokeColor: 'brown'});
            var ellipseh = board.create("ellipse",[efocus1h,efocus2h,epointh], {strokeWidth:2,strokeColor:'#000000'});
            break;
        case "Parabolic":
            var d1 = board.create("point", [-10,-1], {name:"", size: 0, zoom: true});
            var d2 = board.create("point", [-10,1], {name:"", size: 0, zoom: true});
            var focus = board.create("point",[0,0], {name:name1,size: 15, face: 'o', zoom: true, fillColor: 'yellow', strokeColor: 'yellow'});
            var pvertex = board.create("point",[-5,0], {name:name2,size: 4, face: 'o', zoom: true, fillColor: 'brown', strokeColor: 'brown'});
            var dline = board.create("line",[d1,d2], {strokeWidth: 0});
            var parabola = board.create("parabola",[focus, dline], {strokeWidth:2,strokeColor:'#000000'});
            break;
        case "Hyperbolic":
            var f1 = board.create("point", [0,0], {name:name1,size: 15, face: 'o', zoom: true, fillColor: 'yellow', strokeColor: 'yellow'});
            var c = inputs[0]*(5/(inputs[0]-1));
            var f2 = board.create("point", [(-2*c),0], {name:"", size: 0, zoom: true});
            var hvertex = board.create("point",[-5,0], {name:name2,size: 4, face: 'o', zoom: true, fillColor: 'brown', strokeColor: 'brown'});
            var hyperbola = board.create("hyperbola",[f1,f2,hvertex], {strokeWidth:2,strokeColor:'#000000'});
            break;
    }
}

function Clear() {
    document.getElementById("e").innerHTML = "Eccentricity: ";
    document.getElementById("s").innerHTML = "Shape: ";
    document.getElementById("v").innerHTML = "Escape Velocity: ";
    document.getElementById("p").innerHTML = "Velocity required for circular orbit: ";
    document.getElementById("ex").innerHTML = "Hyperbolic Excess Velocity: ";
    document.getElementById("av").innerHTML = "Average Orbital Velocity: ";
    document.getElementById("period").innerHTML = "Orbital Period: ";
    document.getElementById("sma").innerHTML = "Semi-major Axis: ";
    document.getElementById("smn").innerHTML = "Semi-minor Axis: ";
    document.getElementById("rmin").innerHTML = "Perihelion Distance: ";
    document.getElementById("rmax").innerHTML = "Aphelion Distance: ";
    document.getElementById("vmax").innerHTML = "Max. Orbital Velocity: ";
    document.getElementById("vmin").innerHTML = "Min. Orbital Velocity: ";
    document.getElementById("circum").innerHTML = "Orbital Circumference: ";
    document.getElementById("velocity").value = "";
    document.getElementById("radius").value = "";
    document.getElementById("mass1").value = "";
    document.getElementById("mass2").value = "";
    document.getElementById("angle").value = "90";
    document.getElementById("name1").value = "";
    document.getElementById("name2").value = "";
    document.getElementById("preset").value = "none";
    Calculate();
}

function GetPresets() {
    var preset = document.getElementById("preset").value;
    sessionStorage.setItem("preset", preset);
    if (preset !== "none") {
        switch (preset) {
            case "sunearth":
                document.getElementById("velocity").value = "29.292";
                document.getElementById("radius").value = "1.0167";
                document.getElementById("angle").value = "90";
                document.getElementById("mass1").value = "1";
                document.getElementById("mass2").value = "1";
                document.getElementById("unitv").value = "km/s";
                document.getElementById("unitr").value = "AU";
                document.getElementById("unit1").value = "MSun";
                document.getElementById("unit2").value = "MEarth";
                document.getElementById("name1").value = "Sun";
                document.getElementById("name2").value = "Earth";
                break;
            case "earthmoon":
                document.getElementById("velocity").value = "0.970";
                document.getElementById("radius").value = "1.0549";
                document.getElementById("angle").value = "90";
                document.getElementById("mass1").value = "1";
                document.getElementById("mass2").value = "1";
                document.getElementById("unitv").value = "km/s";
                document.getElementById("unitr").value = "LD";
                document.getElementById("unit1").value = "MEarth";
                document.getElementById("unit2").value = "MMoon";
                document.getElementById("name1").value = "Earth";
                document.getElementById("name2").value = "Moon";
                break;
            case "sunmars":
                document.getElementById("velocity").value = "21.97";
                document.getElementById("radius").value = "1.666";
                document.getElementById("angle").value = "90";
                document.getElementById("mass1").value = "1";
                document.getElementById("mass2").value = "0.107";
                document.getElementById("unitv").value = "km/s";
                document.getElementById("unitr").value = "AU";
                document.getElementById("unit1").value = "MSun";
                document.getElementById("unit2").value = "MEarth";
                document.getElementById("name1").value = "Sun";
                document.getElementById("name2").value = "Mars";
                break;
            case "sunvenus":
                document.getElementById("velocity").value = "34.79";
                document.getElementById("radius").value = "0.728";
                document.getElementById("angle").value = "90";
                document.getElementById("mass1").value = "1";
                document.getElementById("mass2").value = "0.815";
                document.getElementById("unitv").value = "km/s";
                document.getElementById("unitr").value = "AU";
                document.getElementById("unit1").value = "MSun";
                document.getElementById("unit2").value = "MEarth";
                document.getElementById("name1").value = "Sun";
                document.getElementById("name2").value = "Venus";
                break;
            case "sunjupiter":
                document.getElementById("velocity").value = "12.44";
                document.getElementById("radius").value = "5.459";
                document.getElementById("angle").value = "90";
                document.getElementById("mass1").value = "1";
                document.getElementById("mass2").value = "317.83";
                document.getElementById("unitv").value = "km/s";
                document.getElementById("unitr").value = "AU";
                document.getElementById("unit1").value = "MSun";
                document.getElementById("unit2").value = "MEarth";
                document.getElementById("name1").value = "Sun";
                document.getElementById("name2").value = "Jupiter";
                break;
            case "sunmercury":
                document.getElementById("velocity").value = "38.86";
                document.getElementById("radius").value = "0.4667";
                document.getElementById("angle").value = "90";
                document.getElementById("mass1").value = "1";
                document.getElementById("mass2").value = "0.0553";
                document.getElementById("unitv").value = "km/s";
                document.getElementById("unitr").value = "AU";
                document.getElementById("unit1").value = "MSun";
                document.getElementById("unit2").value = "MEarth";
                document.getElementById("name1").value = "Sun";
                document.getElementById("name2").value = "Mercury";
                break;
            case "sunsaturn":
                document.getElementById("velocity").value = "9.094";
                document.getElementById("radius").value = "10.124";
                document.getElementById("angle").value = "90";
                document.getElementById("mass1").value = "1";
                document.getElementById("mass2").value = "95.16";
                document.getElementById("unitv").value = "km/s";
                document.getElementById("unitr").value = "AU";
                document.getElementById("unit1").value = "MSun";
                document.getElementById("unit2").value = "MEarth";
                document.getElementById("name1").value = "Sun";
                document.getElementById("name2").value = "Saturn";
                break;
            case "sunuranus":
                document.getElementById("velocity").value = "6.494";
                document.getElementById("radius").value = "20.078";
                document.getElementById("angle").value = "90";
                document.getElementById("mass1").value = "1";
                document.getElementById("mass2").value = "14.54";
                document.getElementById("unitv").value = "km/s";
                document.getElementById("unitr").value = "AU";
                document.getElementById("unit1").value = "MSun";
                document.getElementById("unit2").value = "MEarth";
                document.getElementById("name1").value = "Sun";
                document.getElementById("name2").value = "Uranus";
                break;
            case "sunneptune":
                document.getElementById("velocity").value = "5.373";
                document.getElementById("radius").value = "30.386";
                document.getElementById("angle").value = "90";
                document.getElementById("mass1").value = "1";
                document.getElementById("mass2").value = "17.15";
                document.getElementById("unitv").value = "km/s";
                document.getElementById("unitr").value = "AU";
                document.getElementById("unit1").value = "MSun";
                document.getElementById("unit2").value = "MEarth";
                document.getElementById("name1").value = "Sun";
                document.getElementById("name2").value = "Neptune";
                break;
            case "sunpluto":
                document.getElementById("velocity").value = "3.706";
                document.getElementById("radius").value = "48.826";
                document.getElementById("angle").value = "90";
                document.getElementById("mass1").value = "1";
                document.getElementById("mass2").value = "0.177";
                document.getElementById("unitv").value = "km/s";
                document.getElementById("unitr").value = "AU";
                document.getElementById("unit1").value = "MSun";
                document.getElementById("unit2").value = "MMoon";
                document.getElementById("name1").value = "Sun";
                document.getElementById("name2").value = "Pluto";
                break;
            case "sunhalley":
                document.getElementById("velocity").value = "54.528";
                document.getElementById("radius").value = "0.587";
                document.getElementById("angle").value = "90";
                document.getElementById("mass1").value = "1";
                document.getElementById("mass2").value = "2.2e14";
                document.getElementById("unitv").value = "km/s";
                document.getElementById("unitr").value = "AU";
                document.getElementById("unit1").value = "MSun";
                document.getElementById("unit2").value = "kg";
                document.getElementById("name1").value = "Sun";
                document.getElementById("name2").value = "Halley's Comet";
                break;
            case "sunoumuamua":
                document.getElementById("velocity").value = "87.32";
                document.getElementById("radius").value = "0.256";
                document.getElementById("angle").value = "90";
                document.getElementById("mass1").value = "1";
                document.getElementById("mass2").value = "1e19";
                document.getElementById("unitv").value = "km/s";
                document.getElementById("unitr").value = "AU";
                document.getElementById("unit1").value = "MSun";
                document.getElementById("unit2").value = "kg";
                document.getElementById("name1").value = "Sun";
                document.getElementById("name2").value = "'Oumuamua";
                break;
        }
    }
}

function UnitConversion(value, unit, type) {
    var newvalue;

    if (type == "distance") {
        switch(unit) {
            case "m":
                newvalue = value;
                break;
            case "km":
                newvalue = value*1000;
                break;
            case "cm":
                newvalue = value/100;
                break;
            case "ft":
                newvalue = value/3.28083989501312;
                break;
            case "yd":
                newvalue = value/1.09361329833771;
                break;
            case "mi":
                newvalue = value*1609.344;
                break;
            case "AU":
                newvalue = value*1.495978707e11;
                break;
            case "LD":
                newvalue = value*384400000;
                break;
            case "ly":
                newvalue = value*946073047258e4;
                break;
            case "pc":
                newvalue = value*308567758128e5;
                break;
            case "GR":
                newvalue = value*52850*946073047258e4;
                break;
        }
    } else if (type == "velocity") {
        switch(unit) {
            case "m/s":
                newvalue = value;
                break;
            case "km/s":
                newvalue = value*1000;
                break;
            case "km/h":
                newvalue = value/3.6;
                break;
            case "cm/s":
                newvalue = value/100;
                break;
            case "ft/s":
                newvalue = value/3.28083989501312;
                break;
            case "mi/s":
                newvalue = value*1609.344;
                break;
            case "mi/h":
                newvalue = value/2.23694;
                break;
            case "mach":
                newvalue = value*343;
                break;
            case "c":
                newvalue = value*299792458;
                break;
        }
    } else if (type == "velocityo") {
        switch(unit) {
            case "m/s":
                newvalue = value;
                break;
            case "km/s":
                newvalue = value/1000;
                break;
            case "km/h":
                newvalue = value*3.6;
                break;
            case "cm/s":
                newvalue = value*100;
                break;
            case "ft/s":
                newvalue = value*3.28083989501312;
                break;
            case "mi/s":
                newvalue = value/1609.344;
                break;
            case "mi/h":
                newvalue = value*2.23694;
                break;
            case "mach":
                newvalue = value/343;
                break;
            case "c":
                newvalue = value/299792458;
                break;
        }
    } else if (type == "distanceo") {
        switch(unit) {
            case "m":
                newvalue = value;
                break;
            case "km":
                newvalue = value/1000;
                break;
            case "cm":
                newvalue = value*100;
                break;
            case "ft":
                newvalue = value*3.28083989501312;
                break;
            case "yd":
                newvalue = value*1.09361329833771;
                break;
            case "mi":
                newvalue = value/1609.344;
                break;
            case "AU":
                newvalue = value/1.495978707e11;
                break;
            case "LD":
                newvalue = value/384400000;
                break;
            case "ly":
                newvalue = value/946073047258e4;
                break;
            case "pc":
                newvalue = value/308567758128e5;
                break;
            case "GR":
                newvalue = value/(52850*946073047258e4);
                break;
        }
    } else if (type == "time") {
        switch(unit) {
            case "s":
                newvalue = value;
                break;
            case "yr":
                newvalue = value/31556952;
                break;
            case "mth":
                newvalue = value/2629746;
                break;
            case "d":
                newvalue = value/86400;
                break;
            case "hr":
                newvalue = value/3600;
                break;
            case "min":
                newvalue = value/60;
                break;
        }
    } else {
        switch(unit) {
            case "kg":
                newvalue = value;
                break;
            case "g":
                newvalue = value/1000;
                break;
            case "lb":
                newvalue = value*0.45359237;
                break;
            case "ton":
                newvalue = value*1000;
                break;
            case "MSun":
                newvalue = value*1.98847e30;
                break;
            case "MEarth":
                newvalue = value*5.9722e24;
                break;
            case "MMoon":
                newvalue = value*7.34767e22;
                break;
            case "MGal":
                newvalue = value*1.5e12*1.98847e30;
                break;
        }
    }

    return newvalue;
}

if (sessionStorage.getItem("hasCodeRunBeforeo") !== null) {
setTimeout(function() {
    document.getElementById("preset").value = sessionStorage.getItem("preset"); 
    document.getElementById("velocity").value = sessionStorage.getItem("velocity");
    document.getElementById("radius").value = sessionStorage.getItem("radius");
    document.getElementById("mass1").value = sessionStorage.getItem("mass1");
    document.getElementById("mass2").value = sessionStorage.getItem("mass2");
    document.getElementById("angle").value = sessionStorage.getItem("angle");
    document.getElementById("name1").value = sessionStorage.getItem("name1");
    document.getElementById("name2").value = sessionStorage.getItem("name2");
    document.getElementById("unitv").value = sessionStorage.getItem("unitv");
    document.getElementById("unitr").value = sessionStorage.getItem("unitr");
    document.getElementById("unit1").value = sessionStorage.getItem("unit1");
    document.getElementById("unit2").value = sessionStorage.getItem("unit2");
    document.getElementById("outputve").value = sessionStorage.getItem("outputve");
    document.getElementById("outputvp").value = sessionStorage.getItem("outputvp");
    document.getElementById("outputvav").value = sessionStorage.getItem("outputvav");
    document.getElementById("outputp").value = sessionStorage.getItem("outputp");
    document.getElementById("outputvex").value = sessionStorage.getItem("outputvex");
    document.getElementById("outputsma").value = sessionStorage.getItem("outputsma");
    document.getElementById("outputsmn").value = sessionStorage.getItem("outputsmn");
    document.getElementById("outputrmin").value = sessionStorage.getItem("outputrmin");
    document.getElementById("outputrmax").value = sessionStorage.getItem("outputrmax");
    document.getElementById("outputvmax").value = sessionStorage.getItem("outputvmax");
    document.getElementById("outputvmin").value = sessionStorage.getItem("outputvmin");
    document.getElementById("outputcircum").value = sessionStorage.getItem("outputcircum");
}, 100);
}