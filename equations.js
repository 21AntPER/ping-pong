export const SUVAT_EQUATIONS = {
    s: {
        uvt: (u, v, t) => {
            return 0.5*(u+v)*t
        },
        uat: (u, a, t) => {
            return 0.5*(a)*(t**2)
        },
        uva: (u, v, a) => {
            return ((v**2) - (u**2) / (2*a))
        }
    },
    u: {
        svt: (s, v, t) => {
            return ((2*s)/t) - v
        },
        vat: (v, a, t) => {
            return v - (a*t)
        },
        sva: (s, v, a) => {
            return Math.sqrt((v**2)-(2*a*s))
        }
    },
    v: {
        sut: (s, u, t) => {
            return ((2*s)/t) - u
        },
        uat: (u, a, t) => {
            return u + (a*t)
        },
        sua: (s, u, a) => {
            return Math.sqrt((u**2)+(2*a*s))
        }
    },
    a: {
        uvt: (u, v, t) => {
            return (v-u)/t
        },
        suv: (s, u, v) => {
            return ((v**2)-(u**2))/(2*s)
        },
        sut: (s, u, t) => {
            return (2*s) / (t**2)
        }
    },
    t: {
        uva: (u, v, a) => {
            return (v-u)/a
        },
        sua: (s, u, a) => {
            return Math.sqrt((2*s) / a)
        },
        suv: (s, u, v) => {
            return (2*s) / (u+v)
        }
    }
}

export const SVT_EQUATIONS = {
    s: (v, t) => {
        return v * t
    },
    v: (s, t) => {
        return s / t
    },
    t: (s, v) => {
        return s / v
    }
}