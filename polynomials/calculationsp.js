var degree;
var j;
var Values= [];
var degreeinput;

function UpdateDegree() {
    degree = Number(document.getElementById("degree").value);
    var i;
    var out = "";
    for (i=degree; i>=1; i--) {
        out = out + "<p class='output'><input style='text-align: right' class='w3-input textbox' type='text' onchange='Calculate()' id='input" + (degree-i+1) + "' onchange='Calculate()' />x<sup>" + i + "</sup> + </p>";
    }
    out = out + "<p class='output'><input style='text-align: right' class='w3-input textbox' type='text' onchange='Calculate()' id='input" + (degree+1) + "' onchange='Calculate()' /> = 0</p>";
    document.getElementById("inputs").innerHTML = out;
    document.getElementById("outputs").innerHTML = "";
}

degreeinput = sessionStorage.getItem("storedegree");

function DefineDegree() {
    setTimeout(function() {
        if (degreeinput !== null) {
            document.getElementById("degree").value = degreeinput;
        }
        degree = Number(document.getElementById("degree").value); 
        UpdateDegree(); 
    }, 10);
}
DefineDegree();

Values = JSON.parse(sessionStorage.getItem("inputs"));
if (Values !== null) {
    setTimeout(function() {
        for (j=1; j<=(degree+1); j++) {
            document.getElementById("input" + j).value = Values[(j-1)];
        }
        Calculate();
    }, 10);

}

function ResetDegree() {
    setTimeout(function() {
        degree = Number(document.getElementById("degree").value); 
    }, 10);
}

function OutputValues(OutR, OutI) {
    var i;
    var out = "";
    for (i=1; i<(OutR.length); i++) {
        if (OutI[i] == 0) {
            out = out + "<p class='output'>Root " + i +": " + OutR[i] + "&nbsp;&nbsp;&nbsp;&nbsp;</p>";
        } else if (OutI[i] < 0) {
            OutI[i] = Math.abs(OutI[i]);
            out = out + "<p class='output'>Root " + i +": " + OutR[i] + " - " + OutI[i] + "<b>i</b> &nbsp;&nbsp;&nbsp;&nbsp;</p>";
        } else {
        out = out + "<p class='output'>Root " + i +": " + OutR[i] + " + " + OutI[i] + "<b>i</b> &nbsp;&nbsp;&nbsp;&nbsp;</p>";
        }
    }
    document.getElementById("outputs").innerHTML = out;
}

function Cycle(In, length) {
    var r;
    var s;
    var A = [];
    var B = [];
    var C = [];
    var rd;
    var sd;
    var rerror;
    var serror;
    var limit = 100000;
    var accuracy = 0.000000000000001;
    var discrim;
    var firsttworeal;
    var root1r;
    var root1i;
    var root2r;
    var root2i;
    var Out = [];
    var Roots = [];

    for (i=0; i<=length; i++) {
        A[i] = In[i];
    }
    
    r = Math.random();                            // generates random guesses for r and s in the quadratic x^2 - rx - s
    s = Math.random();

    while (true) {
    
        B[length] = A[length];                                // divides the quintic by the quadratic and finds the coeffiecents of the resulting cubic
        B[length-1] = A[length-1] + r*B[length];
        for(i=(length-2); i >= 0; i--) {
            B[i] = A[i]+r*B[i+1]+s*B[i+2];                // forms the cubic in the format B[2]x^0 + B[3]x^1...B[5]x^3, remainder being B[1](x-r) + B[0]
        } 
                                      
        C[length] = B[length]; 
        C[length-1] = B[length-1] + r*C[length];
        for(i=(length-2); i >= 0; i--) {
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

    for (i=0; i<=(length-2); i++) {
        Out[i] = B[i+2];
    }

    Roots = [root1r, root1i, root2r, root2i, Out];
    return Roots;
}

function Calculate() {
    var RawInput = [];
    var Input = [];
    var Temp = [];
    var Mid = [];
    var OutR = [];
    var OutI = [];
    var inputvar;
    var left;
    var count = 1;
    var sum;
    var discrim;
    var retries = 0;
    var LastTemp = [];
    var a;
    var b;
    var c;

    for (i=0; i<=degree; i++) {
        inputvar = "input" + (i+1);
        RawInput[i] = document.getElementById(inputvar).value;
        Input[degree-i] = Number(RawInput[i]);
    }

    for (i=0; i<=degree; i++) {
        if (Number.isNaN(Input[i])) {
            alert("Please input numbers only");
            document.getElementById("outputs").innerHTML = "";
            return;
        }
    }

    sessionStorage.setItem("inputs", JSON.stringify(RawInput));
    sessionStorage.setItem("storedegree", degree.toString());

    for (i=0; i<=degree; i++) {
        inputvar = "input" + (i+1);
        if (document.getElementById(inputvar).value === "") {
            return;
        }
    }

    while (Input[degree] == 0) {
        degree = degree - 1;
    }

    while ((Input[0] == 0) && (degree > 0)) {
        OutR[count] = 0;
        OutI[count] = 0;
        for (i=0; i<degree; i++) {
            Input[i] = Input[i+1];
        }
        count = count+1;
        degree = degree-1;
        if (degree == 0) {
            OutputValues(OutR, OutI);
            ResetDegree();
            return;
        }
    }

    for (i=0; i<=degree; i++) {
        Temp[i] = Input[i];
    }

    switch(degree) {
        case -1:
            alert("Technically correct, but why?");
            document.getElementById("outputs").innerHTML = "";
            ResetDegree();
            return;
        case 0:
            alert("Incorrect equation");
            document.getElementById("outputs").innerHTML = "";
            ResetDegree();
            return;
        case 1:
            OutR[count] = -Input[0]/Input[1];
            OutI[count] = 0;
            OutputValues(OutR, OutI);
            ResetDegree();
            return;
        case 2:
            a = Temp[2];
            b = Temp[1];
            c = Temp[0];
            discrim = b**2 - 4*a*c;
            if (discrim >= 0) {
                OutR[count] = (-b+Math.sqrt(discrim))/(2*a);
                OutI[count] = 0;
                OutR[count+1] = (-b-Math.sqrt(discrim))/(2*a);
                OutI[count+1] = 0;
            } else if (discrim+0.0000001 >= 0) {
                discrim = 0;
                OutR[count] = -b/(2*a);
                OutI[count] = 0;
                OutR[count+1] = -b/(2*a);
                OutI[count+1] = 0;
            } else {
                discrim = Math.abs(discrim);
                OutR[count] = -b/(2*a);
                OutI[count] = Math.sqrt(discrim)/(2*a);
                OutR[count+1] = -b/(2*a);
                OutI[count+1] = -Math.sqrt(discrim)/(2*a);
            }
            OutputValues(OutR, OutI);
            ResetDegree();
            return;
    }

    left = degree;

    while (left > 2) {
        while (Temp[left] == 0) {
            left = left - 1;
        }

        while (Temp[0] == 0) {
            OutR[count] = 0;
            OutI[count] = 0;
            for (i=0; i<left; i++) {
                Temp[i] = Temp[i+1];
            }
            count = count+1;
            left = left-1;
            if (left == 2) {
                break;
            }
        }
        if (left == 2) {
            break;
        }

        for (retries=0; retries < 10; retries++) {
            Mid = Cycle(Temp, left);
            if (Mid !== "Error") {
                break;
            }
        }

        if (Mid == "Error") {
            alert("Error");
            document.getElementById("outputs").innerHTML = "";
            ResetDegree();
            return;
        }

        OutR[count] = Mid[0];
        OutR[count+1] = Mid[2];
        OutI[count] = Mid[1];
        OutI[count+1] = Mid[3];
        LastTemp = Temp;
        Temp = Mid[4];

        left = left-2;
        count = count + 2;
    }

    switch (left) {
        case 1:
            sum = 0;
            for (i=1; i<degree; i++) {
                sum = sum + OutR[i];
            }
            OutR[count] = -(Input[degree-1]/Input[degree]) - sum;
            OutI[count] = 0;
            break;
        case 2:
            retries = 0;
            sum = (Input[degree-1]/Input[degree]);
            for (i=1; i<(degree-1); i++) {
                sum = sum + OutR[i];
            }
            do {
                retries = retries + 1
                a = Temp[2];
                b = Temp[1];
                c = Temp[0];
                discrim = b**2 - 4*a*c;
                if (discrim >= 0) {
                    OutR[count] = (-b+Math.sqrt(discrim))/(2*a);
                    OutI[count] = 0;
                    OutR[count+1] = (-b-Math.sqrt(discrim))/(2*a);
                    OutI[count+1] = 0;
                } else if (discrim+0.0000001 >= 0) {
                    discrim = 0;
                    OutR[count] = -b/(2*a);
                    OutI[count] = 0;
                    OutR[count+1] = -b/(2*a);
                    OutI[count+1] = 0;
                } else {
                    discrim = Math.abs(discrim);
                    OutR[count] = -b/(2*a);
                    OutI[count] = Math.sqrt(discrim)/(2*a);
                    OutR[count+1] = -b/(2*a);
                    OutI[count+1] = -Math.sqrt(discrim)/(2*a);
                }
                Mid = Cycle(LastTemp, (left+2));
                Temp = Mid[4];
            } while (((Math.round((sum+OutR[count]+OutR[count+1])*1000000))/1000000 !== 0) && (retries < 11));
            if (retries >= 11) {
                alert("Error");
                document.getElementById("outputs").innerHTML = "";
                ResetDegree();
                return;
            }
            break;
    }

    for (i=1; i<=(degree); i++) {
        OutR[i] = Math.round(OutR[i]*100000000000)/100000000000;
        OutI[i] = Math.round(OutI[i]*100000000000)/100000000000;
    }

    OutputValues(OutR, OutI);
    ResetDegree();
}

function Clear() {
    document.getElementById("outputs").innerHTML = "";
    for (i=1; i<=(degree+1); i++) {
        document.getElementById("input" + i).value = "";
    }
}