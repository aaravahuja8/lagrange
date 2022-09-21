window.onload = function () {
    if (sessionStorage.getItem("hasCodeRunBefore") === null) {
        /** Your code here. **/
        sessionStorage.setItem("hasCodeRunBefore", "true");
    }
}

function QuinticRoots(a, b, c, d, e, f) {           // quintic equation in the form ax^5 + bx^4 + cx^ 3+ dx^2 + ex + f = 0
    var r;
    var s;
    var rd;
    var sd;
    var t;
    var u;
    var td;
    var ud;
    var i;
    var discrim;
    var root1r;
    var root1i;
    var root2r;
    var root2i;
    var root3r;
    var root3i;
    var root4r;
    var root4i;
    var root5;
    var rerror;
    var serror;
    var terror;
    var uerror;
    var firsttworeal;
    var secondtworeal;
    var A = [f,e,d,c,b,a];                        // reorders terms of the quintic in the format A[0]x^0 + A[1]x^1...A[5]x^5
    var B = [];
    var C = [];
    var roots = [];
    var accuracy = 0.000000000000001;
    var limit = 10000;

    if ((a == 0) || (f == 0)) {                 // cannot be computed properly if either a or f is 0
        return "Error";
    }
    
    r = Math.random();                            // generates random guesses for r and s in the quadratic x^2 - rx - s
    s = Math.random();

    while (true) {
    
        B[5] = A[5];                                // divides the quintic by the quadratic and finds the coeffiecents of the resulting cubic
        B[4] = A[4] + r*B[5];
        for(i=3; i >= 0; i--) {
            B[i] = A[i]+r*B[i+1]+s*B[i+2];                // forms the cubic in the format B[2]x^0 + B[3]x^1...B[5]x^3, remainder being B[1](x-r) + B[0]
        } 
                                      
        C[5] = B[5]; 
        C[4] = B[4] + r*C[5];
        for(i=3; i >= 0; i--) {
            C[i] = B[i] + r*C[i+1] + s*C[i+2];                        // divides by the quadratic again to find partial derivatives of B[1] and B[0] with respect to r and s
        }

        rd = (-(C[3]*B[0])+(C[2]*B[1]))/((C[3]*C[1])-(C[2]*C[2]));       // finds values rd and sd which can be added to r and s to make B[1] and B[0] and hence the remainder tend to 0
        sd = (-B[0]-C[1]*rd)/C[2];

        rerror = Math.abs(rd/r);                                        // calculates error in r and s
        serror = Math.abs(sd/s);

        if ((rerror < accuracy) && (serror < accuracy)) {               // if error is sufficently small, remainder is also sufficently small so loop exits
            r = r+rd;                                                   // adjusts values of r and s
            s = s+sd;
            break;
        } else {
            r = r+rd;
            s = s+sd;
        }

        if (limit == 0) {
            return "Error";                           // lets only a limited number of attempts occur before failing
        } else {
            limit--;
        }
    }

    discrim = r*r+4*s;
    if (discrim >= 0) {                              // calculates roots of the quadratic and hence 2 of the quintic roots
        firsttworeal = true;
        root1r = (r+Math.sqrt(discrim))/2;
        root1i = 0;
        root2r = (r-Math.sqrt(discrim))/2;
        root2i = 0;
    } else if (discrim+0.0000001 >= 0) {
        discrim = 0;
        firsttworeal = true;
        root1r = r/2;
        root1i = 0;
        root2r = r/2;
        root2i = 0;
    } else {
        firsttworeal = false;
        discrim = Math.abs(discrim);
        root1r = r/2;
        root1i = Math.sqrt(discrim)/2;
        root2r = r/2;
        root2i = -Math.sqrt(discrim)/2;
    }

    var D = [B[2],B[3],B[4],B[5]];                   // repeats the process for the cubic to find 2 more roots and leave a linear equation
    var E = [];
    var F = [];
    limit = 10000;
    t = Math.random();
    u = Math.random();

    while (true) {
    
        E[3] = D[3];
        E[2] = D[2] + t*E[3];
        for(i=1; i >= 0; i--) {
            E[i] = D[i]+t*E[i+1]+u*E[i+2];
        }
        
        F[3] = E[3];
        F[2] = E[2] + t*F[3];
        for (i=1; i >= 0; i--) {
            F[i] = E[i] + t*F[i+1] + u*F[i+2];
        }

        td = (-(F[3]*E[0])+(F[2]*E[1]))/((F[3]*F[1])-(F[2]*F[2]));
        ud = (-E[0]-F[1]*td)/F[2];

        terror = Math.abs(td/t);
        uerror = Math.abs(ud/u);

        if ((terror < accuracy) && (uerror < accuracy)) {
            t = t+td;
            u = u+ud;
            break;
        } else {
            t = t+td;
            u = u+ud;
        }

        if (limit == 0) {
            return "Error";
        } else {
            limit--;
        }
    }

    discrim = t*t+4*u;
    if (discrim >= 0) {
        secondtworeal = true;
        root3r = (t+Math.sqrt(discrim))/2;
        root3i = 0;
        root4r = (t-Math.sqrt(discrim))/2;
        root4i = 0;
    } else if (discrim+0.0000001 >= 0) {
        discrim = 0;
        secondtworeal = true;
        root3r = t/2;
        root3i = 0;
        root4r = t/2;
        root4i = 0;
    } else {
        secondtworeal = false;
        discrim = Math.abs(discrim);
        root3r = t/2;
        root3i = Math.sqrt(discrim)/2;
        root4r = t/2;
        root4i = -Math.sqrt(discrim)/2;
    }

    root5 = -b/a - root1r - root2r - root3r - root4r;                      // calculates the 5th root simply as the other 4 roots are known

    if ((firsttworeal == true) && (secondtworeal == true)) {
        roots = [root1r,root2r,root3r,root4r,root5];
    } else if ((firsttworeal == true) && (secondtworeal == false)) {
        roots = [root1r,root2r,root5];
    } else if ((secondtworeal == true) && (firsttworeal == false)) {
        roots = [root3r,root4r,root5];
    } else {
        roots = [root5];
    }

    return roots;                                                      // returns all real roots
}

function Lagrange1(radius, mass1, mass2) {
    var retries = 0;
    var roots = [];
    var i;
    var approximation;
    var closestroot;

    var a = mass1+mass2;
    var b = -radius*(3*mass1+2*mass2);
    var c = radius*radius*(3*mass1+mass2);
    var d = -radius*radius*radius*mass2;
    var e = 2*radius*radius*radius*radius*mass2;
    var f = -radius*radius*radius*radius*radius*mass2;

    for (retries=0; retries < 5; retries++) {
        roots = QuinticRoots(a, b, c, d, e, f);
        if (roots !== "Error") {
            break;
        }
    }

    approximation = radius*Math.cbrt((mass2)/(3*mass1));

    if (roots == "Error") {
        return approximation;
    }

    closestroot = roots[0];
    for (i=0; i < (roots.length-1); i++) {
        if ((Math.abs(roots[i]-approximation) < Math.abs(closestroot-approximation)) && (roots[i] > 0)) {
            closestroot = roots[i];
        }
    }

    return closestroot;
}

function Lagrange2(radius, mass1, mass2) {
    var retries = 0;
    var roots = [];
    var i;
    var approximation;
    var closestroot;

    var a = mass1+mass2;
    var b = -radius*(3*mass1+2*mass2);
    var c = radius*radius*(3*mass1+mass2);
    var d = radius*radius*radius*mass2;
    var e = -2*radius*radius*radius*radius*mass2;
    var f = radius*radius*radius*radius*radius*mass2;

    for (retries=0; retries < 5; retries++) {
        roots = QuinticRoots(a, b, c, d, e, f);
        if (roots !== "Error") {
            break;
        }
    }

    approximation = radius*Math.cbrt((mass2)/(3*mass1));

    if (roots == "Error") {
        return approximation;
    }

    closestroot = roots[0];
    for (i=0; i < (roots.length-1); i++) {
        if ((Math.abs(roots[i]-approximation) < Math.abs(closestroot-approximation)) && (roots[i] > 0)) {
            closestroot = roots[i];
        }
    }

    return closestroot;
}

function Lagrange3(radius, mass1, mass2) {
    var retries = 0;
    var roots = [];
    var i;
    var approximation;
    var closestroot;

    var a = mass1+mass2;
    var b = -radius*(7*mass1+8*mass2);
    var c = radius*radius*(19*mass1+25*mass2);
    var d = -radius*radius*radius*(24*mass1+37*mass2);
    var e = radius*radius*radius*radius*(12*mass1+26*mass2);
    var f = -7*radius*radius*radius*radius*radius*mass2;

    for (retries=0; retries < 5; retries++) {
        roots = QuinticRoots(a, b, c, d, e, f);
        if (roots !== "Error") {
            break;
        }
    }

    approximation = radius*((7*mass2)/(12*mass1));

    if (roots == "Error") {
        return approximation;
    }

    closestroot = roots[0];
    for (i=0; i < (roots.length-1); i++) {
        if ((Math.abs(roots[i]-approximation) < Math.abs(closestroot-approximation)) && (roots[i] > 0)) {
            closestroot = roots[i];
        }
    }

    return closestroot;
}

function OrbitalDetails(radius, mass1) {
    var velocity;
    var angularvelocity;
    var rotationperiod;
    var Output = [];
    const G = 6.6743e-11;
    const pi = 3.14159265359;

    velocity = Math.sqrt((G*mass1)/radius);
    angularvelocity = Math.sqrt((G*mass1)/(Math.pow(radius, 3)));
    rotationperiod = (2*pi)/angularvelocity;

    Output = [velocity, rotationperiod];
    return Output;
}

function UnitConversionIn(value, unit, type) {
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
                newvalue = value*385000600;
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

function DistanceOut(value, unit) {
    var newvalue;
    
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
            newvalue = value/385000600;
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

    return newvalue;
}

function UnitConversionOut(val1, val2, val3, val4, val5, val6) {
    var Out = [];

    Out[0] = DistanceOut(val1, document.getElementById("output1").value);
    Out[1] = DistanceOut(val2, document.getElementById("output2").value);
    Out[2] = DistanceOut(val3, document.getElementById("output3").value);
    Out[3] = DistanceOut(val4, document.getElementById("output4").value);
    Out[4] = DistanceOut(val4, document.getElementById("output5").value);

    switch(document.getElementById("output6").value) {
        case "m/s":
            Out[5] = val5;
            break;
        case "km/s":
            Out[5] = val5/1000;
            break;
        case "km/h":
            Out[5] = val5*3.6;
            break;
        case "cm/s":
            Out[5] = val5*100;
            break;
        case "ft/s":
            Out[5] = val5*3.28083989501312;
            break;
        case "mi/s":
            Out[5] = val5/1609.344;
            break;
        case "mi/h":
            Out[5] = val5*2.23694;
            break;
        case "mach":
            Out[5] = val5/343;
            break;
        case "c":
            Out[5] = val5/299792458;
            break;
    }

    switch(document.getElementById("output7").value) {
        case "s":
            Out[6] = val6;
            break;
        case "yr":
            Out[6] = val6/31556952;
            break;
        case "mth":
            Out[6] = val6/2629746;
            break;
        case "d":
            Out[6] = val6/86400;
            break;
        case "hr":
            Out[6] = val6/3600;
            break;
        case "min":
            Out[6] = val6/60;
            break;
    }

    return Out;
}

function Calculate() {
    var radius;
    var mass1;
    var mass2;
    var unitr;
    var unit1;
    var unit2;
    var l1distance;
    var l2distance;
    var l3distance;
    var l4l5distance;
    var OrbitDetails;
    var velocity;
    var rotationperiod;
    var OutputValues = [];

    GetPresets();

    lastpresetvalue = document.getElementById("preset").value;

    radius = document.getElementById("radius").value;
    mass1 = document.getElementById("mass1").value;
    mass2 = document.getElementById("mass2").value;
    unitr = document.getElementById("unitr").value;
    unit1 = document.getElementById("unit1").value;
    unit2 = document.getElementById("unit2").value;

    sessionStorage.setItem("radiusl", radius);
    sessionStorage.setItem("mass1l", mass1);
    sessionStorage.setItem("mass2l", mass2);
    sessionStorage.setItem("checked", (document.getElementById("secondary").checked).toString());
    sessionStorage.setItem("output1", document.getElementById("output1").value);
    sessionStorage.setItem("output2", document.getElementById("output2").value);
    sessionStorage.setItem("output3", document.getElementById("output3").value);
    sessionStorage.setItem("output4", document.getElementById("output4").value);
    sessionStorage.setItem("output5", document.getElementById("output5").value);
    sessionStorage.setItem("output6", document.getElementById("output6").value);
    sessionStorage.setItem("output7", document.getElementById("output7").value);
    sessionStorage.setItem("uradius", unitr);
    sessionStorage.setItem("umass1", unit1);
    sessionStorage.setItem("umass2", unit2);

    if ((radius === "") || (mass1 === "") || (mass2 === "")) {
        return;
    }

    radius = Number(radius);
    radius = UnitConversionIn(radius, unitr, "distance");

    mass1 = Number(mass1);
    mass1 = UnitConversionIn(mass1, unit1, "mass");

    mass2 = Number(mass2);
    mass2 = UnitConversionIn(mass2, unit2, "mass");

    if ((Number.isNaN(radius) || Number.isNaN(mass1) || Number.isNaN(mass2)) || ((radius <= 0 ) || (mass1 <= 0) || (mass2 <=0))) {
        alert("Please input positive numbers only");
        document.getElementById("l1").innerHTML = "L1 Distance: ";
        document.getElementById("l2").innerHTML = "L2 Distance: ";
        document.getElementById("l3").innerHTML = "L3 Distance: ";
        document.getElementById("l4").innerHTML = "L4 Distance: ";
        document.getElementById("l5").innerHTML = "L5 Distance: ";
        document.getElementById("velocity").innerHTML = "Orbital Velocity: ";
        document.getElementById("period").innerHTML = "Orbital Period: ";
        document.getElementById("stability").innerHTML = "";
        return;
    }

    if (mass2 >= mass1) {
        alert("The first mass must be larger than the second");
        document.getElementById("l1").innerHTML = "L1 Distance: ";
        document.getElementById("l2").innerHTML = "L2 Distance: ";
        document.getElementById("l3").innerHTML = "L3 Distance: ";
        document.getElementById("l4").innerHTML = "L4 Distance: ";
        document.getElementById("l5").innerHTML = "L5 Distance: ";
        document.getElementById("velocity").innerHTML = "Orbital Velocity: ";
        document.getElementById("period").innerHTML = "Orbital Period: ";
        document.getElementById("stability").innerHTML = "";
        return;
    }

    if ((mass1/mass2) >= 24.96) {
        document.getElementById("stability").innerHTML = "L4 and L5 are stable";
    } else {
        document.getElementById("stability").innerHTML = "L4 and L5 are unstable";
    }

    l1distance = Lagrange1(radius, mass1, mass2);
    l2distance = Math.abs(Lagrange2(radius, mass1, mass2));
    l3distance = Lagrange3(radius, mass1, mass2) + radius + radius;
    l4l5distance = radius;

    if (document.getElementById("primary").checked) {
        l1distance = radius-l1distance;
        l2distance = radius+l2distance;
        l3distance = l3distance - radius;
    }

    OrbitDetails = OrbitalDetails(radius, mass1);
    velocity = OrbitDetails[0];
    rotationperiod = OrbitDetails[1];

    OutputValues = UnitConversionOut(l1distance, l2distance, l3distance, l4l5distance, velocity, rotationperiod);

    document.getElementById("l1").innerHTML = "L1 Distance: " + OutputValues[0];
    document.getElementById("l2").innerHTML = "L2 Distance: " + OutputValues[1];
    document.getElementById("l3").innerHTML = "L3 Distance: " + OutputValues[2];
    document.getElementById("l4").innerHTML = "L4 Distance: " + OutputValues[3];
    document.getElementById("l5").innerHTML = "L5 Distance: " + OutputValues[4];
    document.getElementById("velocity").innerHTML = "Orbital Velocity: " + OutputValues[5];
    document.getElementById("period").innerHTML = "Orbital Period: " + OutputValues[6];

    Draw(l1distance, l2distance, l3distance, l4l5distance);
    update();
}

function Clear() {
    document.getElementById("radius").value = "";
    document.getElementById("mass1").value = "";
    document.getElementById("mass2").value = "";
    document.getElementById("secondary").checked = true;
    document.getElementById("l1").innerHTML = "L1 Distance: ";
    document.getElementById("l2").innerHTML = "L2 Distance: ";
    document.getElementById("l3").innerHTML = "L3 Distance: ";
    document.getElementById("l4").innerHTML = "L4 Distance: ";
    document.getElementById("l5").innerHTML = "L5 Distance: ";
    document.getElementById("velocity").innerHTML = "Orbital Velocity: ";
    document.getElementById("period").innerHTML = "Orbital Period: ";
    document.getElementById("stability").innerHTML = "";
    document.getElementById("preset").value = "none";
    Calculate();
}

function GetPresets() {
    var preset = document.getElementById("preset").value;
    sessionStorage.setItem("presetl", preset);
    switch (preset) {
        case "sunearth":
            document.getElementById("radius").value = "1";
            document.getElementById("mass1").value = "1";
            document.getElementById("mass2").value = "1";
            document.getElementById("secondary").checked = true;
            document.getElementById("unitr").value = "AU";
            document.getElementById("unit1").value = "MSun";
            document.getElementById("unit2").value = "MEarth";
            break;
        case "earthmoon":
            document.getElementById("radius").value = "1";
            document.getElementById("mass1").value = "1";
            document.getElementById("mass2").value = "1";
            document.getElementById("secondary").checked = true;
            document.getElementById("unitr").value = "LD";
            document.getElementById("unit1").value = "MEarth";
            document.getElementById("unit2").value = "MMoon";
            break;
        case "sunmars":
            document.getElementById("radius").value = "1.524";
            document.getElementById("mass1").value = "1";
            document.getElementById("mass2").value = "0.107";
            document.getElementById("secondary").checked = true;
            document.getElementById("unitr").value = "AU";
            document.getElementById("unit1").value = "MSun";
            document.getElementById("unit2").value = "MEarth";
            break;
        case "sunvenus":
            document.getElementById("radius").value = "0.723";
            document.getElementById("mass1").value = "1";
            document.getElementById("mass2").value = "0.815";
            document.getElementById("secondary").checked = true;
            document.getElementById("unitr").value = "AU";
            document.getElementById("unit1").value = "MSun";
            document.getElementById("unit2").value = "MEarth";
            break;
        case "sunjupiter":
            document.getElementById("radius").value = "5.203";
            document.getElementById("mass1").value = "1";
            document.getElementById("mass2").value = "317.83";
            document.getElementById("secondary").checked = true;
            document.getElementById("unitr").value = "AU";
            document.getElementById("unit1").value = "MSun";
            document.getElementById("unit2").value = "MEarth";
            break;
        case "sunmercury":
            document.getElementById("radius").value = "0.39";
            document.getElementById("mass1").value = "1";
            document.getElementById("mass2").value = "0.0553";
            document.getElementById("secondary").checked = true;
            document.getElementById("unitr").value = "AU";
            document.getElementById("unit1").value = "MSun";
            document.getElementById("unit2").value = "MEarth";
            break;
        case "sunsaturn":
            document.getElementById("radius").value = "9.539";
            document.getElementById("mass1").value = "1";
            document.getElementById("mass2").value = "95.16";
            document.getElementById("secondary").checked = true;
            document.getElementById("unitr").value = "AU";
            document.getElementById("unit1").value = "MSun";
            document.getElementById("unit2").value = "MEarth";
            break;
        case "sunuranus":
            document.getElementById("radius").value = "19.18";
            document.getElementById("mass1").value = "1";
            document.getElementById("mass2").value = "14.54";
            document.getElementById("secondary").checked = true;
            document.getElementById("unitr").value = "AU";
            document.getElementById("unit1").value = "MSun";
            document.getElementById("unit2").value = "MEarth";
            break;
        case "sunneptune":
            document.getElementById("radius").value = "30.06";
            document.getElementById("mass1").value = "1";
            document.getElementById("mass2").value = "17.15";
            document.getElementById("secondary").checked = true;
            document.getElementById("unitr").value = "AU";
            document.getElementById("unit1").value = "MSun";
            document.getElementById("unit2").value = "MEarth";
            break;
        case "sunpluto":
            document.getElementById("radius").value = "39.53";
            document.getElementById("mass1").value = "1";
            document.getElementById("mass2").value = "0.177";
            document.getElementById("secondary").checked = true;
            document.getElementById("unitr").value = "AU";
            document.getElementById("unit1").value = "MSun";
            document.getElementById("unit2").value = "MMoon";
            break;
    }
}

function Draw(l1distance, l2distance, l3distance, l4l5distance) {
    var svgElement = document.getElementById("rect1");

}

if (sessionStorage.getItem("hasCodeRunBefore") !== null) {
setTimeout(function() {
    var presetin = sessionStorage.getItem("presetl");
    var radiusin = sessionStorage.getItem("radiusl");
    var mass1in = sessionStorage.getItem("mass1l");
    var mass2in = sessionStorage.getItem("mass2l");
    var checkedin = sessionStorage.getItem("checked");
    var uradiusin = sessionStorage.getItem("uradius");
    var umass1in = sessionStorage.getItem("umass1");
    var umass2in = sessionStorage.getItem('umass2');
    
    document.getElementById("preset").value = presetin;
    document.getElementById("unitr").value = uradiusin;
    document.getElementById("unit1").value = umass1in;
    document.getElementById("unit2").value = umass2in;
    document.getElementById("radius").value = radiusin;
    document.getElementById("mass1").value = mass1in;
    document.getElementById("mass2").value = mass2in;
    if (checkedin == "true") {
        document.getElementById("secondary").checked = true;
    } else {
        document.getElementById("primary").checked = true;
    }
    document.getElementById("output1").value = sessionStorage.getItem("output1");
    document.getElementById("output2").value = sessionStorage.getItem("output2");
    document.getElementById("output3").value = sessionStorage.getItem("output3");
    document.getElementById("output4").value = sessionStorage.getItem("output4");
    document.getElementById("output5").value = sessionStorage.getItem("output5");
    document.getElementById("output6").value = sessionStorage.getItem("output6");
    document.getElementById("output7").value = sessionStorage.getItem("output7");
}, 100);
}