

let submitted = () => {
    let input_voltage = document.getElementById("input_voltage").value;
    let output_voltage = document.getElementById("output_voltage").value;
    let output_current = document.getElementById("output_current").value;
    let frequency = document.getElementById("frequency").value;
    let s_v_min = document.getElementById("s_v_min").value;
    let s_v_max = document.getElementById("s_v_max").value;
    let diode_drop = document.getElementById("diode_drop").value;
    let eff = document.getElementById("eff").value;
    let b_m = document.getElementById("b_m").value;
    let k_u = document.getElementById("k_u").value;
    let d_max = document.getElementById("d_max").value;


    let n = ((parseFloat(output_voltage) + (2 * diode_drop)) / s_v_min) * ((1 - d_max) / d_max);
    console.log(n)
    const turn_ratio = document.getElementById("turn_ratio");
    turn_ratio.innerHTML = n

    let d_min = ((d_max) / (parseFloat(d_max) + ((1 - d_max) * (s_v_max / s_v_min))));
    console.log(d_min)
    const d_minx = document.getElementById("d_min");
    d_minx.innerHTML = d_min

    let delta_i1 = (2 * n * output_current) / (d_min)
    console.log(delta_i1)
    const delta_i1s = document.getElementById("delta_i1");
    delta_i1s.innerHTML = delta_i1

    let delta_i2 = (delta_i1 / n);
    console.log(delta_i2)
    const delta_i2s = document.getElementById("delta_i2");
    delta_i2s.innerHTML = delta_i2

    let p02 = (parseFloat(output_voltage) + 2 * diode_drop) * output_current * ((1 - d_min) / d_min);
    console.log(p02)
    const p02_s = document.getElementById("p02");
    p02_s.innerHTML = p02

    let j = 300;
    let s1 = (1 / eff) * Math.sqrt((4 * d_max) / 3);
    let s2 = Math.sqrt((4 * (1 - d_max)) / 3)
    let a_p = ((p02 * (parseFloat(s1) + parseFloat(s2))) / ((k_u - 0.04) * j * b_m * frequency)) * 1000000;
    console.log(a_p)
    const ap_s = document.getElementById("a_p");
    ap_s.innerHTML = a_p


    let a_c = 107;
    let a_w = 256;


    let n1 = (s_v_max * d_min * 100000) / (a_c * 2 * frequency)
    n1 = parseInt(n1 + 1)
    console.log(n1)
    n2 = parseInt(n * n1 + 1);
    console.log(n2)
    const n1_s = document.getElementById("n1");
    n1_s.innerHTML = n1
    const n2_s = document.getElementById("n2");
    n2_s.innerHTML = n2


    let var1 = (3 / 4) * (Math.pow((2 * output_current) / (1 - d_max), 2) - Math.pow(delta_i2, 2))
    let i2 = Math.sqrt(((1 - d_max) / 3) * (delta_i2 * delta_i2 + var1))
    let var2 = (3 / 4) * (Math.pow((2 * (output_current * n)) / (d_max), 2) - Math.pow(delta_i1, 2))
    let i1 = Math.sqrt(((d_max) / 3) * (delta_i1 * delta_i1 + var2))
    const i1_s = document.getElementById("i1");
    i1_s.innerHTML = i1
    const i2_s = document.getElementById("i2");
    i2_s.innerHTML = i2

    let a1 = i1 * 100 / j;
    let a2 = i2 * 100 / j;
    console.log(i2)
    console.log(i1)

    console.log(a1);
    console.log(a2)

    const a1_s = document.getElementById("a1");
    a1_s.innerHTML = a1
    const a2_s = document.getElementById("a2");
    a2_s.innerHTML = a2

    // wire selected 
    s_a1 = 1.589;
    s_a2 = 2.075;
    // Cross Check

    let lhs = a_w * k_u;
    let rhs = s_a1 * n1 + parseFloat(s_a2 * n2) // We have to take selected wire area here 
    console.log(lhs);
    console.log(rhs)


    const cross_check = document.getElementById("cross-check");

    if (lhs >= rhs) {
        cross_check.innerHTML = "Cross Check Successful!"
    }
    else {
        cross_check.innerHTML = "Cross Check Failed!"
    }


    // Air Gap Length
    let primary_inductance = (s_v_min * d_max * 10000) / (frequency * delta_i1)

    console.log(primary_inductance)
    const primary_inductance_s = document.getElementById("primary_inductance");
    primary_inductance_s.innerHTML = primary_inductance

    let l_g = (a_c * n1 * n1 * 1.257 * 0.001) / (primary_inductance)
    console.log(l_g)
    const lg_s = document.getElementById("lg");
    lg_s.innerHTML = l_g
}
