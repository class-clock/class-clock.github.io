function ccapi(schedule,type) {
    // initiations
    this.schedule = schedule;
    this.type = type;
    this.lastClass = "";
    this.recentChange = true;
    
    // fixed values
    this.days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    this.months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    
    // working variables
    this.date = new Date(); // all can be manually set after object definition and this.updateTime(), but before retreiving data
    this.day = this.date.getDay();
    this.hour = this.date.getHours();
    this.minute = this.date.getMinutes();
    this.second = this.date.getSeconds();
    
    // retrieving functions
    this.getDate = function() {
        return(this.months[this.date.getMonth()]+" "+this.date.getDate());
    };
    this.getYear = function() {
        return(this.date.getFullYear());
    };
    this.getDay = function(type) { //type=true for raw number value, not day string
        if (type===true) {
            return(this.day);
        } else {
            return(this.days[this.day]);
        }
    };
    this.getTime = function(type) { // type for formatting
        if (type) {
            return(this.formatTime(this.hour,this.minute,type));
        } else {
            return({"hour":this.hour,"minute":this.minute});
        }
    };
    this.getClass = function(obj) { // obj=true to return full object
    try{
        let current;
        for (current of this.schedule[this.type][this.days[this.day]]) {
            if (this.timeGreater(this.getTime("m"),current.start) && this.timeLesser(this.getTime("m"),current.end)) {
                if (obj===true) {
                    return(current);
                } else {
                    return(current.name);
                }
            }
        }
        return({"name":"Empty"});
    }catch(e){alert(this.type);}
    };
    this.getNextClass = function(obj) { // obj=true to return full object
        let ar = this.schedule[this.type][this.days[this.day]];
        for (let i=0;i<ar.length;i++) {
            if (this.timeGreater(this.getTime("m"),ar[i].start) && this.timeLesser(this.getTime("m"),ar[i].end)) {
                if (obj===true) {
                    if (i==ar.length-1) {
                        return({"name":"Empty"});
                    } else {
                        return(ar[i+1]);
                    }
                } else {
                    if (i==ar.length-1) {
                        return("Empty");
                    } else {
                        return(ar[i+1].name);
                    }
                }
            }
        }
        if (obj===true) {
            return({"name":"Empty"});
        } else {
            return("Empty");
        }
    };
    // working functions
    this.updateTime = function() {
        this.date = new Date();
        this.day = this.date.getDay();
        this.hour = this.date.getHours();
        this.minute = this.date.getMinutes();
        this.second = this.date.getSeconds();
    };
    this.checkBell = function() {
        let doBell = this.lastClass!=this.getClass(true).name && this.recentChange===false;
        if (this.lastClass!=this.getClass(true).name) {
            this.lastClass=this.getClass(true).name;
        }
        this.recentChange=false;
        return(doBell);
    };
    this.timeGreater = function(t1,t2) { // true if 1>=2
        return(parseInt(t1.split(":")[0])>parseInt(t2.split(":")[0])||parseInt(t1.split(":")[0])==parseInt(t2.split(":")[0]) && parseInt(t1.split(":")[1])>=parseInt(t2.split(":")[1]));
    };
    this.timeLesser = function(t1,t2) { // true if 1<2
        return(parseInt(t1.split(":")[0])<parseInt(t2.split(":")[0])||parseInt(t1.split(":")[0])==parseInt(t2.split(":")[0]) && parseInt(t1.split(":")[1])<parseInt(t2.split(":")[1]));
    };
    this.formatTime = function(h,m,p) {
        let out = "";
        if (p && p.indexOf("m")!=-1) {
            out+=h;
        } else {
            out+=(h>12 ? h%12 : h);
        }
        out+=(m.toString().length<2 ? ":0": ":")+m;
        if (p && p.indexOf("p")!=-1) {
            out+=(h>12 ? " PM" : " AM");
        }
        return(out);
    };
}
