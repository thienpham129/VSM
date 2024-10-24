Number.prototype.formatnum = function(n, x) {
    var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&.");
};

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();

    var ampm = hours >= 12 ? "pm" : "am";
    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    hours = hours < 10 ? "0" + hours : hours;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
}

function scrollTopToSelector(target, delay = 100, extrapx = 0) {
    $("html, body")
        .stop()
        .animate({
                scrollTop: $(target).offset().top + Number(extrapx),
            },
            delay,
            "swing",
            function() {
                window.location.hash = target;
            }
        );
}

$("[data-scrollto]").click(function() {
    let target = $(this).attr("data-scrollto");
    scrollTopToSelector(target);
});
const getURLParameters = (url) =>
    (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
        (a, v) => (
            (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
        ), {}
    );
Date.prototype.getDateDDMMYYYY = function(type = 1) {
    var yyyy = this.getFullYear().toString();
    let dd = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
    let mm =
        this.getMonth() + 1 < 10 ?
        "0" + (this.getMonth() + 1) :
        this.getMonth() + 1;

    if (type == 1) {
        return `${dd}${mm}${yyyy}`;
    }

    return `${dd}/${mm}/${yyyy}`;
};

class SearchTicket {
    constructor(config = {}) {
        this.config = config;

        config.wrap ? (this.wrap = config.wrap) : (this.wrap = "");
        config.target ? (this.target = config.target) : (this.target = "_SELF");
        config.pointUpSelector ?
            (this.pointUpSelector = config.pointUpSelector) :
            (this.pointUpSelector = ".pointUp");
        config.pointDownSelector ?
            (this.pointDownSelector = config.pointDownSelector) :
            (this.pointDownSelector = ".pointDown");
        config.dateSelector ?
            (this.dateSelector = config.dateSelector) :
            (this.dateSelector = ".ticket_date");
        config.timeSelector ?
            (this.timeSelector = config.timeSelector) :
            (this.timeSelector = ".ticket_time");
        config.numberSeatSelector ?
            (this.numberSeatSelector = config.numberSeatSelector) :
            (this.numberSeatSelector = ".number-seat");

        config.triggleSearchTicket ?
            (this.triggleSearchTicket = config.triggleSearchTicket) :
            (this.triggleSearchTicket = "[data-action=searchTripBasic]");

        let dateObj = new Date();
        let now = dateObj.getDateDDMMYYYY(2);

        config.pointUpData() ?
            (this.pointUpData = config.pointUpData()) :
            (this.pointUpData = "");
        config.pointDownData() ?
            (this.pointDownData = config.pointDownData()) :
            (this.pointDownData = "");
        config.dateData() ?
            (this.dateData = config.dateData()) :
            (this.dateData = now);
        config.timeData() ?
            (this.timeData = config.timeData()) :
            (this.timeData = "none");
        config.numberSeatData() ?
            (this.numberSeatData = config.numberSeatData()) :
            (this.numberSeatData = "");
        if (this.numberSeatData != "" && this.numberSeatData <= 0) {
            this.numberSeatData = "";
        }

        config.toggleResetSelector ?
            (this.toggleResetSelector = config.toggleResetSelector) :
            (this.toggleResetSelector = "[data-action=resetSearch]");

        config.textPointUpSelector ?
            (this.textPointUpSelector = config.textPointUpSelector) :
            (this.textPointUpSelector = "[data-point-target=pointUp]");
        config.textStartTimeSelector ?
            (this.textStartTimeSelector = config.textStartTimeSelector) :
            (this.textStartTimeSelector = "[data-content=startTime]");
        config.textPointDownSelector ?
            (this.textPointDownSelector = config.textPointDownSelector) :
            (this.textPointDownSelector = "[data-point-target=pointDown]");

        if (config.listPointById) {
            this.listPointById = config.listPointById();
            this.usePointIndex = true;
        } else {
            this.listPointById = {};
            this.usePointIndex = false;
        }
        this.innitConfigDatePicker();
        this.innitConfigTimePicker();
        this.initConfig();
        this.innitConfigSelect2();
        this.initPointClickEvent();
    }

    validate() {
        let pointUpDOM = $(this.getPointUpSelector());
        let pointDownDOM = $(this.getPointUpSelector());
        let errorBagSelector = [];

        if (this.pointUpData == "") {
            errorBagSelector.push(this.getTextPointUpSelector());
        }

        if (this.pointDownData == "") {
            errorBagSelector.push(this.getTextPointDownSelector());
        }

        if (errorBagSelector.length > 0) {
            return { status: false, data: errorBagSelector };
        }
        return { status: true, data: [] };
    }

    getTextPointUpSelector() {
        return `${this.wrap} ${this.textPointUpSelector}`;
    }

    getTextPointDownSelector() {
        return `${this.wrap} ${this.textPointDownSelector}`;
    }

    getPointUpSelector() {
        return `${this.wrap} ${this.pointUpSelector}`;
    }

    getPointDownSelector() {
        return `${this.wrap} ${this.pointDownSelector}`;
    }

    static changeFormatToDisplay(dateString) {
        if (dateString.length == 8) {
            let year = `${dateString[0]}${dateString[1]}${dateString[2]}${dateString[3]}`;
            let month = `${dateString[4]}${dateString[5]}`;
            let day = `${dateString[6]}${dateString[7]}`;

            return `${day}/${month}/${year}`;
        }

        return "01/01/2019";
    }

    static changeFormatToDateParam(dateString) {
        let dateArray = dateString.split("/");
        if (dateArray.length == 3) {
            let yyyy = dateArray[2];
            let mm = dateArray[1].length < 2 ? "0" + dateArray[1] : dateArray[1];
            let dd = dateArray[0].length < 2 ? "0" + dateArray[0] : dateArray[0];

            return `${yyyy}${mm}${dd}`;
        }

        return "20190101";
    }

    getPointUp() {
        return this.pointUpData;
    }

    getPointDown() {
        return this.pointDownData;
    }

    getDate() {
        return this.dateData;
    }

    getUrlToSearch() {
        if (this.timeData == "none") this.timeData = 0;

        // if(false) {
        //     return `/dat-ve?date=${SearchTicket.changeFormatToDateParam(this.dateData)}&startPoint=${this.pointUpData}&endPoint=${this.pointDownData}&time=${this.timeData}&totalEmptySeat=${this.numberSeatData}`;
        // }

        // if(!this.listPointById[this.pointUpData] || this.listPointById[this.pointDownData] ) {
        //     return
        // }

        let pointUpAlias = this.listPointById[this.pointUpData]["alias"];
        let pointUpIndex = this.listPointById[this.pointUpData]["index"];
        let pointDownAlias = this.listPointById[this.pointDownData]["alias"];
        let pointDownIndex = this.listPointById[this.pointDownData]["index"];

        let url = `/dat-ve/ve-xe-tu-${pointUpAlias.trim()}-den-${pointDownAlias.trim()}-${pointUpIndex}d${pointDownIndex}.html?date=${SearchTicket.changeFormatToDateParam(
        this.dateData
      )}`;

        if (this.timeData != 0) {
            url += `&time=${this.timeData}`;
        }

        if (this.numberSeatData != "") {
            url += `&totalEmptySeat=${this.numberSeatData}`;
        }

        return url;
    }

    innitConfigDatePicker() {
        var today = new Date();

        $(`${this.wrap} ${this.dateSelector}`).datepicker({
            format: "dd/mm/yyyy",
            startDate: today,
            todayHighlight: true,
            orientation: "bottom",
            autoclose: true,
        });

        $(`${this.wrap} ${this.dateSelector}`).datepicker("setDate", today);
    }

    innitConfigTimePicker() {
        $(`${this.wrap} ${this.timeSelector}`).timepicker({
            minTime: "00:00am",
            maxTime: "11:00pm",
            timeFormat: "H:i",
            // showDuration: true,
            show2400: true,
            scrollDefault: "now",
            step: function(i) {
                return i % 2 ? 15 : 45;
            },
        });
    }

    innitConfigSelect2() {
        let pointUpDom = $(`${this.wrap} ${this.pointUpSelector}`);
        let pointDownDom = $(`${this.wrap} ${this.pointDownSelector}`);

        $(`${this.wrap} ${this.textPointUpSelector}`).html(
            $(`${this.wrap} ${this.pointUpSelector} option:selected`).text()
        );
        $(`${this.wrap} ${this.textPointDownSelector}`).html(
            $(`${this.wrap} ${this.pointDownSelector} option:selected`).text()
        );

        pointUpDom.select2({
            allowClear: true,
            templateResult: function(state) {
                var $state = $(
                    `<span data-content="pointUpOption" data-point-id="${$(
              state.element
            ).val()}" data-route-id="${$(state.element).attr(
              "data-route-id"
            )}">` +
                    state.text +
                    "</span>"
                );
                return $state;
            },
        });

        pointDownDom.select2({
            allowClear: true,
            templateResult: function(state) {
                var $state = $(
                    `<span data-content="pointDownOption" data-point-id="${$(
              state.element
            ).val()}" data-route-id="${$(state.element).attr(
              "data-route-id"
            )}">` +
                    state.text +
                    "</span>"
                );
                return $state;
            },
        });

        pointUpDom.on("select2:select", (e) => {
            var data = e.params.data;
            $(`${this.wrap} ${this.textPointUpSelector}`).html(data.text.trim());
        });

        pointDownDom.on("select2:select", (e) => {
            var data = e.params.data;
            $(`${this.wrap} ${this.textPointDownSelector}`).html(data.text.trim());
        });
    }

    setPointUp(pointId) {
        let pointUpDom = $(`${this.wrap} ${this.pointUpSelector}`);
        pointUpDom.val(this.pointUpData);
        pointUpDom.select2().trigger("change");
    }

    initConfig() {
        let pointUpDom = $(`${this.wrap} ${this.pointUpSelector}`);
        let pointDownDom = $(`${this.wrap} ${this.pointDownSelector}`);

        pointUpDom.val(this.pointUpData);
        pointUpDom.select2().trigger("change");
        $(`${this.wrap} ${this.textPointUpSelector}`).html(this.pointUpData);

        pointDownDom.val(this.pointDownData);
        pointDownDom.select2().trigger("change");
        $(`${this.wrap} ${this.textPointDownSelector}`).html(this.pointDownData);

        $(`${this.wrap} ${this.dateSelector}`).val(this.dateData);

        if (this.timeData != "none") {
            let hours = Math.floor(this.timeData / 3600000);
            let minutes = Math.floor((this.timeData % 3600000) / 60000);

            var dateObj = new Date(0, 0, 0, hours, minutes, 0);

            $(`${this.wrap} ${this.textStartTimeSelector}`).text(formatAMPM(dateObj));
            $(`${this.wrap} ${this.timeSelector}`).timepicker("setTime", dateObj);
        } else {
            $(`${this.wrap} ${this.textStartTimeSelector}`).text("--:--");
            $(`${this.wrap} ${this.timeSelector}`).timepicker(
                "setTime",
                new Date(0, 0, 0, 0, 0, 0)
            );
        }

        $(`${this.wrap} ${this.numberSeatSelector}`).val(this.numberSeatData);

        let dateAsArray = this.dateData.split("/");
        // $(`${this.wrap} ${this.dateSelector}`).datepicker("setDate", $.datepicker.parseDate( "dd-mm-yy", `${dateAsArray[0]}-${dateAsArray[1]}-${dateAsArray[2]}`));
        $(`${this.wrap} ${this.dateSelector}`).datepicker(
            "setDate",
            new Date(dateAsArray[2], dateAsArray[1] - 1, dateAsArray[0])
        );
    }

    getListPointDownByRoute(routeSelectedArr) {
        let listPointDown = [];
        $(`[role=option] [data-content=pointDownOption]`).each((ind, elem) => {
            let listRoutePointDown = $(elem).attr("data-route-id");

            if (listRoutePointDown) {
                let listRoutePointDownArr = listRoutePointDown.split(",");
                let totalRouteArr = [...routeSelectedArr, ...listRoutePointDownArr];
                let totalRoute = routeSelectedArr.length + listRoutePointDownArr.length;

                if ([...new Set(totalRouteArr)].length != totalRoute) {
                    listPointDown.push(elem);
                }
            }
        });

        return listPointDown;
    }

    // hideProvin () {
    //     let numberPoint = $('.select2-results__option [role=group]').find('li[role=option]').length
    //     let numberPointShow = $('.select2-results__option [role=group]').find('li[role=option][data-point-status=true]').length
    // }

    initPointClickEvent() {
        let pointUpDOM = $(`${this.wrap} ${this.pointUpSelector}`);
        let pointDownDOM = $(`${this.wrap} ${this.pointDownSelector}`);
        let triggleSearchTicketDOM = $(`${this.wrap} ${this.triggleSearchTicket}`);
        let toggleResetSelector = $(`${this.wrap} ${this.toggleResetSelector}`);
        let dateDom = $(`${this.wrap} ${this.dateSelector}`);
        let timeDom = $(`${this.wrap} ${this.timeSelector}`);
        let numberSeatDom = $(`${this.wrap} ${this.numberSeatSelector}`);
        var listRouteSelected = null;

        triggleSearchTicketDOM.on("click", (e) => {
            console.log(this.getUrlToSearch());
            let url = `${this.getUrlToSearch()}`;
            let validator = this.validate();

            if (!validator.status) {
                validator["data"].forEach(function(value) {
                    $(value).addClass("invalid");
                });
                return false;
            }
            const loader = document.getElementById("loader");

            if (this.target == "_BLANK") {
                window.open(url, this.target);
            } else {
                if (loader) {
                    loader.classList.add("fadeIn");
                }

                // window.location.href = url;
                window.open(url, this.target);
            }
        });

        toggleResetSelector.on("click", (e) => {
            this.pointUpData = "";
            $(`${this.wrap} ${this.textPointUpSelector}`).text("Chọn điểm lên");
            this.pointDownData = "";
            $(`${this.wrap} ${this.textPointDownSelector}`).text("Chọn điểm đến");
        });

        pointUpDOM.on("change", (e) => {
            this.pointUpData = pointUpDOM.val();

            listRouteSelected = $(pointUpDOM.select2("data")[0].element).attr(
                "data-route-id"
            );

            if (pointDownDOM.val() == "") {
                pointDownDOM.select2("open");
            }

            setTimeout(() => {
                let listPointDown = this.getListPointDownByRoute(
                    listRouteSelected.split(",")
                );

                if (listRouteSelected) {
                    $(`[role=option] [data-content=pointDownOption]`).parent().hide();
                    $(`[role=option] [data-content=pointDownOption]`)
                        .parent()
                        .attr("data-point-status", false);

                    listPointDown.forEach(function(elem) {
                        $(elem).parent().show();
                        $(elem).parent().attr("data-point-status", true);
                    });

                    $(
                            `[role=option] [data-content=pointDownOption][data-point-id=${pointUpDOM.val()}]`
                        )
                        .parent()
                        .hide();
                    $(
                            `[role=option] [data-content=pointDownOption][data-point-id=${pointUpDOM.val()}]`
                        )
                        .parent()
                        .attr("data-point-status", false);
                }
            }, 80);

            if (pointUpDOM.val() != "") {
                $(this.getTextPointUpSelector()).removeClass("invalid");
            } else {
                $(this.getTextPointUpSelector()).addClass("invalid");
            }
        });

        pointDownDOM.on("select2:open", (e) => {
            setTimeout(() => {
                let listPointDown = this.getListPointDownByRoute(
                    listRouteSelected.split(",")
                );

                if (listRouteSelected) {
                    $(`[role=option] [data-content=pointDownOption]`).parent().hide();

                    listPointDown.forEach(function(elem) {
                        $(elem).parent().show();
                    });

                    $(
                            `[role=option] [data-content=pointDownOption][data-point-id=${pointUpDOM.val()}]`
                        )
                        .parent()
                        .hide();
                }
            }, 80);
        });

        pointDownDOM.on("change", (e) => {
            this.pointDownData = pointDownDOM.val();
            $(this.getTextPointDownSelector()).removeClass("invalid");

            // dateDom.focus();
        });
        // $(`[role=option] [data-content=pointDownOption]`).parent().show()

        dateDom.on("change", (e) => {
            this.dateData = dateDom.val();

            // timeDom.focus();
        });

        numberSeatDom.on("change", (e) => {
            this.numberSeatData = numberSeatDom.val();

            // timeDom.focus();
        });

        timeDom.on("changeTime", (value) => {
            let dataCallBack = {};

            $(`${this.wrap} ${this.textStartTimeSelector}`).text(timeDom.val());
            this.timeData = timeDom.timepicker("getSecondsFromMidnight") * 1000;

            dataCallBack.date = SearchTicket.changeFormatToDateParam(this.dateData);
            dataCallBack.dateData = this.dateData;
            dataCallBack.pointUpData = this.pointUpData;
            dataCallBack.pointDownData = this.pointDownData;
            dataCallBack.timeData = this.timeData;
            dataCallBack.numberSeatData = this.numberSeatData;
            dataCallBack.urlParam = this.getUrlToSearch();
            dataCallBack.isValid = this.pointUpData != "" && this.pointDownData != "";

            this.config.doWhenChoseTime(dataCallBack);
        });
    }
}

class SearchTicketMobile {
    constructor(config = {}) {
        this.config = config;
        config.wrap ? (this.wrap = config.wrap) : (this.wrap = "");
        config.target ? (this.target = config.target) : (this.target = "_SELF");
        config.pointUpSelector ?
            (this.pointUpSelector = config.pointUpSelector) :
            (this.pointUpSelector = `${this.wrap} .pointUp`);
        config.pointDownSelector ?
            (this.pointDownSelector = config.pointDownSelector) :
            (this.pointDownSelector = `${this.wrap} .pointDown`);
        config.dateSelector ?
            (this.dateSelector = config.dateSelector) :
            (this.dateSelector = ".ticket_date");
        config.timeSelector ?
            (this.timeSelector = config.timeSelector) :
            (this.timeSelector = ".ticket_time");
        config.numberSeatSelector ?
            (this.numberSeatSelector = config.numberSeatSelector) :
            (this.numberSeatSelector = ".number-seat");

        config.triggleSearchTicket ?
            (this.triggleSearchTicket = config.triggleSearchTicket) :
            (this.triggleSearchTicket = "[data-action=searchTripBasic]");

        let dateObj = new Date();
        let now = dateObj.getDateDDMMYYYY(2);

        config.pointUpData() ?
            (this.pointUpData = config.pointUpData()) :
            (this.pointUpData = "");
        config.pointDownData() ?
            (this.pointDownData = config.pointDownData()) :
            (this.pointDownData = "");
        config.dateData() ?
            (this.dateData = config.dateData()) :
            (this.dateData = now);
        config.timeData() ?
            (this.timeData = config.timeData()) :
            (this.timeData = "none");
        config.numberSeatData() ?
            (this.numberSeatData = config.numberSeatData()) :
            (this.numberSeatData = "");
        if (this.numberSeatData != "" && this.numberSeatData <= 0) {
            this.numberSeatData = "";
        }

        config.toggleResetSelector ?
            (this.toggleResetSelector = config.toggleResetSelector) :
            (this.toggleResetSelector = "[data-action=resetSearch]");

        config.textPointUpSelector ?
            (this.textPointUpSelector = config.textPointUpSelector) :
            (this.textPointUpSelector = "[data-point-target=pointUp]");
        config.textStartTimeSelector ?
            (this.textStartTimeSelector = config.textStartTimeSelector) :
            (this.textStartTimeSelector = "[data-content=startTime]");
        config.textPointDownSelector ?
            (this.textPointDownSelector = config.textPointDownSelector) :
            (this.textPointDownSelector = "[data-point-target=pointDown]");

        if (config.listPointById) {
            this.listPointById = config.listPointById();
            this.usePointIndex = true;
        } else {
            this.listPointById = {};
            this.usePointIndex = false;
        }
        this.innitConfigDatePicker();
        this.innitConfigTimePicker();
        this.initConfig();
        this.innitConfigSelect2();
        this.initPointClickEvent();
    }

    validate() {
        let pointUpDOM = $(this.getPointUpSelector());
        let pointDownDOM = $(this.getPointUpSelector());
        let errorBagSelector = [];

        if (this.pointUpData == "") {
            errorBagSelector.push(this.getTextPointUpSelector());
        }

        if (this.pointDownData == "") {
            errorBagSelector.push(this.getTextPointDownSelector());
        }

        if (errorBagSelector.length > 0) {
            return { status: false, data: errorBagSelector };
        }
        return { status: true, data: [] };
    }

    getTextPointUpSelector() {
        return `${this.wrap} ${this.textPointUpSelector}`;
    }

    getTextPointDownSelector() {
        return `${this.wrap} ${this.textPointDownSelector}`;
    }

    getPointUpSelector() {
        return `${this.wrap} ${this.pointUpSelector}`;
    }

    getPointDownSelector() {
        return `${this.wrap} ${this.pointDownSelector}`;
    }

    static changeFormatToDisplay(dateString) {
        if (dateString.length == 8) {
            let year = `${dateString[0]}${dateString[1]}${dateString[2]}${dateString[3]}`;
            let month = `${dateString[4]}${dateString[5]}`;
            let day = `${dateString[6]}${dateString[7]}`;

            return `${day}/${month}/${year}`;
        }

        return "01/01/2019";
    }

    static changeFormatToDateParam(dateString) {
        let dateArray = dateString.split("/");
        if (dateArray.length == 3) {
            let yyyy = dateArray[2];
            let mm = dateArray[1].length < 2 ? "0" + dateArray[1] : dateArray[1];
            let dd = dateArray[0].length < 2 ? "0" + dateArray[0] : dateArray[0];

            return `${yyyy}${mm}${dd}`;
        }

        return "20190101";
    }

    getPointUp() {
        return this.pointUpData;
    }

    getPointDown() {
        return this.pointDownData;
    }

    getDate() {
        return this.dateData;
    }

    getUrlToSearch() {
        if (this.timeData == "none") this.timeData = 0;

        // if(false) {
        //     return `/dat-ve?date=${SearchTicket.changeFormatToDateParam(this.dateData)}&startPoint=${this.pointUpData}&endPoint=${this.pointDownData}&time=${this.timeData}&totalEmptySeat=${this.numberSeatData}`;
        // }

        // if(!this.listPointById[this.pointUpData] || this.listPointById[this.pointDownData] ) {
        //     return
        // }

        let pointUpAlias = this.listPointById[this.pointUpData]["alias"];
        let pointUpIndex = this.listPointById[this.pointUpData]["index"];
        let pointDownAlias = this.listPointById[this.pointDownData]["alias"];
        let pointDownIndex = this.listPointById[this.pointDownData]["index"];

        let url = `/dat-ve/ve-xe-tu-${pointUpAlias.trim()}-den-${pointDownAlias.trim()}-${pointUpIndex}d${pointDownIndex}.html?date=${SearchTicket.changeFormatToDateParam(
        this.dateData
      )}`;

        if (this.timeData != 0) {
            url += `&time=${this.timeData}`;
        }

        if (this.numberSeatData != "") {
            url += `&totalEmptySeat=${this.numberSeatData}`;
        }

        return url;
    }

    innitConfigDatePicker() {
        var today = new Date();

        $(`${this.wrap} ${this.dateSelector}`).datepicker({
            format: "dd/mm/yyyy",
            startDate: today,
            todayHighlight: true,
            orientation: "bottom",
            autoclose: true,
        });

        $(`${this.wrap} ${this.dateSelector}`).datepicker("setDate", today);
    }

    innitConfigTimePicker() {
        $(`${this.wrap} ${this.timeSelector}`).timepicker({
            minTime: "00:00am",
            maxTime: "11:00pm",
            timeFormat: "H:i",
            // showDuration: true,
            show2400: true,
            scrollDefault: "now",
            step: function(i) {
                return i % 2 ? 15 : 45;
            },
        });
    }

    innitConfigSelect2() {
        let pointUpDom = $(`${this.wrap} ${this.pointUpSelector}`);
        let pointDownDom = $(`${this.wrap} ${this.pointDownSelector}`);

        $(`${this.wrap} ${this.textPointUpSelector}`).html(
            $(`${this.wrap} ${this.pointUpSelector} option:selected`).text()
        );
        $(`${this.wrap} ${this.textPointDownSelector}`).html(
            $(`${this.wrap} ${this.pointDownSelector} option:selected`).text()
        );

        pointUpDom.select2({
            allowClear: true,
            templateResult: function(state) {
                var $state = $(
                    `<span data-content="pointUpOption" data-point-id="${$(
              state.element
            ).val()}" data-route-id="${$(state.element).attr(
              "data-route-id"
            )}">` +
                    state.text +
                    "</span>"
                );
                return $state;
            },
        });

        pointDownDom.select2({
            allowClear: true,
            templateResult: function(state) {
                var $state = $(
                    `<span data-content="pointDownOption" data-point-id="${$(
              state.element
            ).val()}" data-route-id="${$(state.element).attr(
              "data-route-id"
            )}">` +
                    state.text +
                    "</span>"
                );
                return $state;
            },
        });

        pointUpDom.on("select2:select", (e) => {
            var data = e.params.data;
            $(`${this.wrap} ${this.textPointUpSelector}`).html(data.text.trim());
        });

        pointDownDom.on("select2:select", (e) => {
            var data = e.params.data;
            $(`${this.wrap} ${this.textPointDownSelector}`).html(data.text.trim());
        });
    }

    setPointUp(pointId) {
        let pointUpDom = $(`${this.wrap} ${this.pointUpSelector}`);
        pointUpDom.val(this.pointUpData);
        pointUpDom.select2().trigger("change");
    }

    initConfig() {
        let pointUpDom = $(`${this.wrap} ${this.pointUpSelector}`);
        let pointDownDom = $(`${this.wrap} ${this.pointDownSelector}`);

        pointUpDom.val(this.pointUpData);
        pointUpDom.select2().trigger("change");
        $(`${this.wrap} ${this.textPointUpSelector}`).html(this.pointUpData);

        pointDownDom.val(this.pointDownData);
        pointDownDom.select2().trigger("change");
        $(`${this.wrap} ${this.textPointDownSelector}`).html(this.pointDownData);

        $(`${this.wrap} ${this.dateSelector}`).val(this.dateData);

        if (this.timeData != "none") {
            let hours = Math.floor(this.timeData / 3600000);
            let minutes = Math.floor((this.timeData % 3600000) / 60000);

            var dateObj = new Date(0, 0, 0, hours, minutes, 0);

            $(`${this.wrap} ${this.textStartTimeSelector}`).text(formatAMPM(dateObj));
            $(`${this.wrap} ${this.timeSelector}`).timepicker("setTime", dateObj);
        } else {
            $(`${this.wrap} ${this.textStartTimeSelector}`).text("--:--");
            $(`${this.wrap} ${this.timeSelector}`).timepicker(
                "setTime",
                new Date(0, 0, 0, 0, 0, 0)
            );
        }

        $(`${this.wrap} ${this.numberSeatSelector}`).val(this.numberSeatData);

        let dateAsArray = this.dateData.split("/");
        // $(`${this.wrap} ${this.dateSelector}`).datepicker("setDate", $.datepicker.parseDate( "dd-mm-yy", `${dateAsArray[0]}-${dateAsArray[1]}-${dateAsArray[2]}`));
        $(`${this.wrap} ${this.dateSelector}`).datepicker(
            "setDate",
            new Date(dateAsArray[2], dateAsArray[1] - 1, dateAsArray[0])
        );
    }

    getListPointDownByRoute(routeSelectedArr) {
        let listPointDown = [];
        $(`[role=option] [data-content=pointDownOption]`).each((ind, elem) => {
            let listRoutePointDown = $(elem).attr("data-route-id");

            if (listRoutePointDown) {
                let listRoutePointDownArr = listRoutePointDown.split(",");
                let totalRouteArr = [...routeSelectedArr, ...listRoutePointDownArr];
                let totalRoute = routeSelectedArr.length + listRoutePointDownArr.length;

                if ([...new Set(totalRouteArr)].length != totalRoute) {
                    listPointDown.push(elem);
                }
            }
        });

        return listPointDown;
    }

    // hideProvin () {
    //     let numberPoint = $('.select2-results__option [role=group]').find('li[role=option]').length
    //     let numberPointShow = $('.select2-results__option [role=group]').find('li[role=option][data-point-status=true]').length
    // }

    initPointClickEvent() {
        let pointUpDOM = $(`${this.wrap} ${this.pointUpSelector}`);
        let pointDownDOM = $(`${this.wrap} ${this.pointDownSelector}`);
        let triggleSearchTicketDOM = $(`${this.wrap} ${this.triggleSearchTicket}`);
        let toggleResetSelector = $(`${this.wrap} ${this.toggleResetSelector}`);
        let dateDom = $(`${this.wrap} ${this.dateSelector}`);
        let timeDom = $(`${this.wrap} ${this.timeSelector}`);
        let numberSeatDom = $(`${this.wrap} ${this.numberSeatSelector}`);
        var listRouteSelected = null;

        triggleSearchTicketDOM.on("click", (e) => {
            console.log(this.getUrlToSearch());
            let url = `${this.getUrlToSearch()}`;
            let validator = this.validate();

            if (!validator.status) {
                validator["data"].forEach(function(value) {
                    $(value).addClass("invalid");
                });
                return false;
            }
            const loader = document.getElementById("loader");

            if (this.target == "_BLANK") {
                window.open(url, this.target);
            } else {
                if (loader) {
                    loader.classList.add("fadeIn");
                }

                // window.location.href = url;
                window.open(url, this.target);
            }
        });

        toggleResetSelector.on("click", (e) => {
            this.pointUpData = "";
            $(`${this.wrap} ${this.textPointUpSelector}`).text("Chọn điểm lên");
            this.pointDownData = "";
            $(`${this.wrap} ${this.textPointDownSelector}`).text("Chọn điểm đến");
        });

        pointUpDOM.on("change", (e) => {
            this.pointUpData = pointUpDOM.val();

            listRouteSelected = $(pointUpDOM.select2("data")[0].element).attr(
                "data-route-id"
            );

            if (pointDownDOM.val() == "") {
                pointDownDOM.select2("open");
            }

            setTimeout(() => {
                let listPointDown = this.getListPointDownByRoute(
                    listRouteSelected.split(",")
                );

                if (listRouteSelected) {
                    $(`[role=option] [data-content=pointDownOption]`).parent().hide();
                    $(`[role=option] [data-content=pointDownOption]`)
                        .parent()
                        .attr("data-point-status", false);

                    listPointDown.forEach(function(elem) {
                        $(elem).parent().show();
                        $(elem).parent().attr("data-point-status", true);
                    });

                    $(
                            `[role=option] [data-content=pointDownOption][data-point-id=${pointUpDOM.val()}]`
                        )
                        .parent()
                        .hide();
                    $(
                            `[role=option] [data-content=pointDownOption][data-point-id=${pointUpDOM.val()}]`
                        )
                        .parent()
                        .attr("data-point-status", false);
                }
            }, 80);

            if (pointUpDOM.val() != "") {
                $(this.getTextPointUpSelector()).removeClass("invalid");
            } else {
                $(this.getTextPointUpSelector()).addClass("invalid");
            }
        });

        pointDownDOM.on("select2:open", (e) => {
            setTimeout(() => {
                let listPointDown = this.getListPointDownByRoute(
                    listRouteSelected.split(",")
                );

                if (listRouteSelected) {
                    $(`[role=option] [data-content=pointDownOption]`).parent().hide();

                    listPointDown.forEach(function(elem) {
                        $(elem).parent().show();
                    });

                    $(
                            `[role=option] [data-content=pointDownOption][data-point-id=${pointUpDOM.val()}]`
                        )
                        .parent()
                        .hide();
                }
            }, 80);
        });

        pointDownDOM.on("change", (e) => {
            this.pointDownData = pointDownDOM.val();
            $(this.getTextPointDownSelector()).removeClass("invalid");

            // dateDom.focus();
        });
        // $(`[role=option] [data-content=pointDownOption]`).parent().show()

        dateDom.on("change", (e) => {
            this.dateData = dateDom.val();

            // timeDom.focus();
        });

        numberSeatDom.on("change", (e) => {
            this.numberSeatData = numberSeatDom.val();

            // timeDom.focus();
        });

        timeDom.on("changeTime", (value) => {
            let dataCallBack = {};

            $(`${this.wrap} ${this.textStartTimeSelector}`).text(timeDom.val());
            this.timeData = timeDom.timepicker("getSecondsFromMidnight") * 1000;

            dataCallBack.date = SearchTicket.changeFormatToDateParam(this.dateData);
            dataCallBack.dateData = this.dateData;
            dataCallBack.pointUpData = this.pointUpData;
            dataCallBack.pointDownData = this.pointDownData;
            dataCallBack.timeData = this.timeData;
            dataCallBack.numberSeatData = this.numberSeatData;
            dataCallBack.urlParam = this.getUrlToSearch();
            dataCallBack.isValid = this.pointUpData != "" && this.pointDownData != "";

            this.config.doWhenChoseTime(dataCallBack);
        });
    }
}

const validateMsgs = {
    vi: {
        msg1: "Vui lòng số lượng ghế !",
        msg2: "Số lượng ghế không hợp lệ !",
        msg3: "Vui lòng chọn chỗ ngồi !",
        msg4: "Vui lòng chọn điểm lên !",
        msg5: "Vui lòng chọn điểm xuống !",
        msg6: "Vui lòng nhập tên !",
        msg7: "Vui lòng nhập số điện thoại !",
        msg8: "Số điện thoại không quá 11 số !",
        msg9: "Vui lòng nhập email !",
        msg10: "Email không đúng định dạng !",
        msg11: "Email không đúng định dạng !",
        msg12: "Vui lòng nhập địa chỉ !",
        msg13: "Vui lòng nhập địa chỉ !",
        msg14: "Vui lòng chọn điểm trung chuyển !",
        msg15: "Vui lòng nhập mã khuyến mãi !",
        msg16: "Mã khuyến mãi không hợp lệ !",
        msg17: "Vui lòng chọn ít nhất 1 ghế !",
        msg18: "Chuyến hiện tại không đủ số ghế trống. Vui lòng chọn chuyến khác !",
        msg19: "Chỉ chọn tối đa 6 chỗ !",
        msg20: "Vui lòng chọn điểm trung chuyển !",
        msg21: "Số điện thoại không đúng định dạng !",
    },
    en: {
        msg1: "Number of seats please !",
        msg2: "Invalid number of seats!",
        msg3: "Please choose a seat!",
        msg4: "Please select up !",
        msg5: "Please select a down score!",
        msg6: "Please enter a name !",
        msg7: "Please enter phone number!",
        msg8: "No more than 11 numbers!",
        msg9: "Please enter email !",
        msg10: "Email malformed !",
        msg11: "Email malformed !",
        msg12: "Please enter address !",
        msg13: "Please enter address !",
        msg14: "Please select a transit point!",
        msg15: "Please enter promo code!",
        msg16: "Invalid promo code!",
        msg17: "Please select at least 1 seat!",
        msg18: "The current flight does not have enough seats available. Please choose another route !",
        msg19: "Select up to 6 seats only!",
        msg20: "Please select a transit point!",
        msg21: "Phone number malformed !",
    },
};
class Booking {
    constructor(config = {}) {
        this.config = config;

        config.mainWrap ? (this.mainWrap = config.mainWrap) : (this.mainWrap = "");
        config.nextTabSelector ?
            (this.nextTabSelector = config.nextTabSelector) :
            (this.nextTabSelector = "[data-action=toggleTab]");
        // config.urlCalcPrice ? this.urlCalcPrice = config.urlCalcPrice : this.urlCalcPrice = "";

        config.toggleProcessBookingClass ?
            (this.toggleProcessBookingClass = config.toggleProcessBookingClass) :
            (this.toggleProcessBookingClass = "");
        this.lang = config.lang ? config.lang : "vi";

        this.initConfig();
        this.initEventSubmt();

        this.initAllowPickingAndDroping();
        this.initRegionLocation();
        this.initChangeNumberSeat();

        this.initChangePoint();
        this.initChangePointTransshipment();

        this.initCheckPromotion();
    }

    static getAllowSeatBooking(tripId, mainWrap) {
        let seatAllow = $(
            `${mainWrap} [data-form-trip-id=${tripId}] input[name=seat_allow]`
        ).val();
        return seatAllow.split(",");
    }

    static getSeatSelected(tripId, mainWrap) {
        var dataString = "";
        let listSeatSelected = $(
            `${mainWrap} [data-trip-id=${tripId}][data-seat-id][data-seat-status=selected]`
        );

        $.each(listSeatSelected, function(index, value) {
            dataString += $(value).attr("data-seat-id") + ",";
        });

        return dataString.slice(0, -1);
    }

    static getCurrentPrice(tripId, mainWrap) {
        return $(`${mainWrap} [data-wrap-trip=${tripId}] input[name=price]`).val();
    }

    static getPriceWithoudPromotion(tripId, mainWrap) {
        return $(
            `${mainWrap} [data-wrap-trip=${tripId}] input[name=priceNotPromo]`
        ).val();
    }

    static setPriceWithoudPromotion(tripId, mainWrap, value) {
        $(`${mainWrap} [data-wrap-trip=${tripId}] input[name=priceNotPromo]`).val(
            value
        );
    }

    static setPricePromotion(tripId, mainWrap, value) {
        $(`${mainWrap} [data-wrap-trip=${tripId}] input[name=pricePromo]`).val(
            value
        );
    }

    static getPricePromotion(tripId, mainWrap) {
        return $(
            `${mainWrap} [data-wrap-trip=${tripId}] input[name=pricePromo]`
        ).val();
    }
    static getPointDownVal(tripId, mainWrap) {
        let pointDownType = $(
            `${this.mainWrap} [data-form-trip-id=${tripId}] select[name=pointDown_type]`
        );
        if (pointDownType.val() == 3) {
            return $(
                `${mainWrap} [data-wrap-trip=${tripId}] select[name=pointDown_transshipment]`
            ).val();
        }
        return $(
            `${mainWrap} [data-wrap-trip=${tripId}] select[name=pointDown]`
        ).val();
    }
    static getPointUpVal(tripId, mainWrap) {
        let pointUpType = $(
            `${this.mainWrap} [data-form-trip-id=${tripId}] select[name=pointUp_type]`
        );
        if (pointUpType.val() == 3) {
            return $(
                `${mainWrap} [data-wrap-trip=${tripId}] select[name=pointUp_transshipment]`
            ).val();
        }
        return $(
            `${mainWrap} [data-wrap-trip=${tripId}] select[name=pointUp]`
        ).val();
    }
    static getSurchargePointLocation(tripId, mainWrap) {
        if (!isRegionByLocation) return { pointUp: 0, pointDown: 0 };

        const pointUpPrice =
            $(
                `${mainWrap} [data-form-trip-id=${tripId}] [name=pointUp_region_pt]`
            ).val() || 0;
        const pointDownPrice =
            $(
                `${mainWrap} [data-form-trip-id=${tripId}] [name=pointDown_region_pt]`
            ).val() || 0;
        return {
            pointUp: pointUpPrice,
            pointDown: pointDownPrice,
        };
    }
    static getSearchPointUpVal() {
        return $("#searchPointUp").val();
    }
    static getSearchPointDownVal() {
        return $("#searchPointDown").val();
    }
    initChangePoint() {
        let mainWrap = this.mainWrap;
        let pointDom = $(
            `${mainWrap} select[name=pointUp], ${mainWrap} select[name=pointDown]`
        );
        pointDom.change(function() {
            let tripId = $(this).attr("data-trip-id");
            SeatMapBuider.reCalculateSeatPrice(tripId, mainWrap);
            // let listTransshipmentPrice = Booking.getTransshipmentPrice(
            //   tripId,
            //   mainWrap
            // );
            // let totalTransshipmentPrice =
            //   listTransshipmentPrice[0] + listTransshipmentPrice[1];

            // let seatPrice = SeatMapBuider.getSeatPrice(tripId, mainWrap);
            // console.log(seatPrice);
            // let totalPrice = seatPrice + totalTransshipmentPrice;

            // let pricePromo = Booking.getPricePromotion(tripId, mainWrap);
            // let totalPriceWithPromo =
            //   totalPrice - pricePromo < 0 ? 0 : totalPrice - pricePromo;

            // let priceShowed = totalPriceWithPromo;
            // let additionPriceForUserType = Booking.getAdditionPriceForUserType(
            //   tripId,
            //   this.mainWrapSelector
            // );
            // additionPriceForUserType.forEach((value) => {
            //   if (value.type == 1) {
            //     priceShowed = priceShowed + value.mode * value.amount;
            //   } else {
            //     priceShowed =
            //       priceShowed + (value.mode * value.amount * priceShowed) / 100;
            //   }
            // });

            // Booking.setPriceText(priceShowed < 0 ? 0 : priceShowed, tripId, mainWrap);
            // Booking.setPriceWithoudPromotion(tripId, mainWrap, totalPrice);
        });
    }
    initChangePointTransshipment() {
        let mainWrap = this.mainWrap;
        let pointDom = $(
            `${mainWrap} select[name=pointUp_transshipment], ${mainWrap} select[name=pointDown_transshipment]`
        );
        pointDom.change(function() {
            let tripId = $(this).attr("data-trip-id");
            SeatMapBuider.reCalculateSeatPrice(tripId, mainWrap);
        });
    }
    static setPriceText(price = 0, tripId, mainWrap) {
        $(`${mainWrap} [data-wrap-trip=${tripId}] [data-content=totalPrice]`).html(
            Number(price).formatnum()
        );
        $(`${mainWrap} [data-wrap-trip=${tripId}] input[name=price]`).val(price);
    }
    static getRouteIdOfTrip(tripId, mainWrap) {
        return $(
            `${mainWrap} [data-wrap-trip=${tripId}] input[name=routeId]`
        ).val();
    }
    static getPhoneNumber(tripId, mainWrap) {
        return $(`${mainWrap} [data-wrap-trip=${tripId}] input[name=phone]`).val();
    }
    static getExtraPrice(tripId, mainWrap) {
        return $(
                `${mainWrap} [data-wrap-trip=${tripId}] input[name=extraPrice]`
            ).val() ?
            Number(
                $(
                    `${mainWrap} [data-wrap-trip=${tripId}] input[name=extraPrice]`
                ).val()
            ) :
            undefined;
    }
    static getExtraPriceType(tripId, mainWrap) {
        return $(
                `${mainWrap} [data-wrap-trip=${tripId}] input[name=extraPriceType]`
            ).val() ?
            Number(
                $(
                    `${mainWrap} [data-wrap-trip=${tripId}] input[name=extraPriceType]`
                ).val()
            ) :
            undefined;
    }

    initAllowPickingAndDroping() {
        let mainWrap = this.mainWrap;

        $(`${mainWrap} [data-action=switchAddress]`).change(function() {
            let target = $(this).attr("data-target");
            let tripId = $(this).attr("data-trip-id");

            if ($(this).val() == 0) {
                $(`${mainWrap} [data-form-trip-id=${tripId}] [name=${target}]`).show();
                $(
                    `${mainWrap} [data-form-trip-id=${tripId}] [name=${target}_transshipment]`
                ).hide();
                if (!isRegionByLocation) {
                    $(
                        `${mainWrap} [data-form-trip-id=${tripId}] [name=${target}_address]`
                    ).hide();
                } else {
                    $(
                        `${mainWrap} [data-form-trip-id=${tripId}] .${target}_region`
                    ).hide();
                }
            } else if ($(this).val() == 3) {
                if (!isRegionByLocation) {
                    $(
                        `${mainWrap} [data-form-trip-id=${tripId}] [name=${target}_address]`
                    ).hide();
                } else {
                    $(
                        `${mainWrap} [data-form-trip-id=${tripId}] .${target}_region`
                    ).hide();
                }

                $(
                    `${mainWrap} [data-form-trip-id=${tripId}] [name=${target}_transshipment]`
                ).show();
                $(`${mainWrap} [data-form-trip-id=${tripId}] [name=${target}]`).hide();
            } else {
                if (!isRegionByLocation) {
                    $(
                        `${mainWrap} [data-form-trip-id=${tripId}] [name=${target}_address]`
                    ).show();
                } else {
                    $(
                        `${mainWrap} [data-form-trip-id=${tripId}] .${target}_region`
                    ).show();
                }

                $(
                    `${mainWrap} [data-form-trip-id=${tripId}] [name=${target}_transshipment]`
                ).hide();
                $(`${mainWrap} [data-form-trip-id=${tripId}] [name=${target}]`).hide();
            }
        });
    }
    initRegionLocation() {
        let mainWrap = this.mainWrap;

        $(`${mainWrap} [name=pointDown_region_street]`).change(function() {
            let target = $(this).attr("data-target");
            let tripId = $(this).attr("data-trip-id");

            let pointDownTranshipmentDom = document.querySelector(
                `${mainWrap} [data-form-trip-id=${tripId}] select[name=pointDown_region_street]`
            );
            if (
                pointDownTranshipmentDom.options[pointDownTranshipmentDom.selectedIndex]
            ) {
                let pointDownPrice =
                    pointDownTranshipmentDom.options[
                        pointDownTranshipmentDom.selectedIndex
                    ].getAttribute("data-point-tsprice");
                let pointDownRegion =
                    pointDownTranshipmentDom.options[
                        pointDownTranshipmentDom.selectedIndex
                    ].getAttribute("data-region-id");
                let pointDownChooseable = pointDownTranshipmentDom.options[
                    pointDownTranshipmentDom.selectedIndex
                ].getAttribute("data-trip-choosable");
                $(
                    `${mainWrap} [data-form-trip-id=${tripId}] [name=pointDown_region_pt]`
                ).val(pointDownPrice);
                $(
                    `${mainWrap} [data-form-trip-id=${tripId}] select[name=pointDown_region_location]`
                ).val(pointDownRegion);
                if (pointDownChooseable) {
                    SeatMapBuider.reCalculateSeatPriceNoChooseAble(tripId, mainWrap);
                } else {
                    SeatMapBuider.reCalculateSeatPrice(tripId, mainWrap);
                }
            }
        });
        $(`${mainWrap} [name=pointUp_region_street]`).change(function() {
            let target = $(this).attr("data-target");
            let tripId = $(this).attr("data-trip-id");

            let pointUpTranshipmentDom = document.querySelector(
                `${mainWrap} [data-form-trip-id=${tripId}] select[name=pointUp_region_street]`
            );
            if (
                pointUpTranshipmentDom.options[pointUpTranshipmentDom.selectedIndex]
            ) {
                let pointUpPrice =
                    pointUpTranshipmentDom.options[
                        pointUpTranshipmentDom.selectedIndex
                    ].getAttribute("data-point-tsprice");
                let pointUpRegion =
                    pointUpTranshipmentDom.options[
                        pointUpTranshipmentDom.selectedIndex
                    ].getAttribute("data-region-id");
                let pointUpChooseable = pointUpTranshipmentDom.options[
                    pointUpTranshipmentDom.selectedIndex
                ].getAttribute("data-trip-choosable");
                $(
                    `${mainWrap} [data-form-trip-id=${tripId}] [name=pointUp_region_pt]`
                ).val(pointUpPrice);
                $(
                    `${mainWrap} [data-form-trip-id=${tripId}] select[name=pointUp_region_location]`
                ).val(pointUpRegion);
                if (pointUpChooseable) {
                    SeatMapBuider.reCalculateSeatPriceNoChooseAble(tripId, mainWrap);
                } else {
                    SeatMapBuider.reCalculateSeatPrice(tripId, mainWrap);
                }
            }
        });

        $(`${mainWrap} [name=pointDown_region_location]`).change(function() {
            let target = $(this).attr("data-target");
            let tripId = $(this).attr("data-trip-id");
            let html = `<option value="" data-point-tsprice="0">Chọn đường</option>`;
            if ($(this).val()) {
                const streetOption = streetListPointDown.filter(
                    (item) => item.id == $(this).val()
                );
                if (streetOption.length > 0) {
                    streetOption.map((item) => {
                        html += `<option value="${item.value}" data-point-tsprice="${item.streetPrice}" data-region-id="${item.id}">${item.value}</option>`;
                    });
                }
            } else {
                if (streetListPointDown.length > 0) {
                    streetListPointDown.map((item) => {
                        html += `<option value="${item.value}" data-point-tsprice="${item.streetPrice}" data-region-id="${item.id}">${item.value}</option>`;
                    });
                }
            }
            let chooseable = $(this).attr("data-trip-choosable");
            if (chooseable) {
                SeatMapBuider.reCalculateSeatPriceNoChooseAble(tripId, mainWrap);
            } else {
                SeatMapBuider.reCalculateSeatPrice(tripId, mainWrap);
            }
            $(
                `${mainWrap} [data-form-trip-id=${tripId}] [name=pointDown_region_pt]`
            ).val(0);
            $(
                `${mainWrap} [data-form-trip-id=${tripId}] select[name=pointDown_region_street]`
            ).html(html);
        });
        $(`${mainWrap} [name=pointUp_region_location]`).change(function() {
            let target = $(this).attr("data-target");
            let tripId = $(this).attr("data-trip-id");
            let html = `<option value="" data-point-tsprice="0">Chọn đường</option>`;
            if ($(this).val()) {
                const streetOption = streetListPointUp.filter(
                    (item) => item.id == $(this).val()
                );
                if (streetOption.length > 0) {
                    streetOption.map((item) => {
                        html += `<option value="${item.value}" data-point-tsprice="${item.streetPrice}" data-region-id="${item.id}">${item.value}</option>`;
                    });
                }
            } else {
                if (streetListPointUp.length > 0) {
                    streetListPointUp.map((item) => {
                        html += `<option value="${item.value}" data-point-tsprice="${item.streetPrice}" data-region-id="${item.id}">${item.value}</option>`;
                    });
                }
            }
            let chooseable = $(this).attr("data-trip-choosable");
            if (chooseable) {
                SeatMapBuider.reCalculateSeatPriceNoChooseAble(tripId, mainWrap);
            } else {
                SeatMapBuider.reCalculateSeatPrice(tripId, mainWrap);
            }
            $(
                `${mainWrap} [data-form-trip-id=${tripId}] [name=pointUp_region_pt]`
            ).val(0);
            $(
                `${mainWrap} [data-form-trip-id=${tripId}] select[name=pointUp_region_street]`
            ).html(html);
        });
    }
    static getPointUpPointDown(tripId, mainWrap) {
        let pointUp = $(
            `${mainWrap} [data-wrap-trip=${tripId}] select[name=pointUp]`
        ).val();
        let pointDown = $(
            `${mainWrap} [data-wrap-trip=${tripId}] select[name=pointDown]`
        ).val();
        return pointUp + "," + pointDown;
    }

    static getAdditionPriceForUserType(tripId, mainWrap) {
        let additionPriceForUserType = $(
            `${mainWrap} [data-wrap-trip=${tripId}] [data-content=additionPriceForUserType]`
        ).text();

        if (additionPriceForUserType && additionPriceForUserType != "") {
            additionPriceForUserType = JSON.parse(additionPriceForUserType);
            return additionPriceForUserType.map((item) => {
                return {
                    amount: item.amount,
                    type: item.type,
                    mode: item.mode,
                };
            });
        }

        return [];
    }
    static getTransshipmentUpId(tripId, mainWrap) {
        let pointUpDomType = document.querySelector(
            `${mainWrap} [data-wrap-trip=${tripId}] select[name=pointUp_type]`
        );
        if (pointUpDomType && $(pointUpDomType).val() == 3) {
            let pointUpDomTranshipmentDom = document.querySelector(
                `${mainWrap} [data-wrap-trip=${tripId}] select[name=pointUp_transshipment]`
            );
            if (pointUpDomTranshipmentDom && $(pointUpDomTranshipmentDom).val()) {
                return $(pointUpDomTranshipmentDom).val();
            }
        }
        return null;
    }
    static getTransshipmentDownId(tripId, mainWrap) {
        let pointDownDomType = document.querySelector(
            `${mainWrap} [data-wrap-trip=${tripId}] select[name=pointDown_type]`
        );
        if (pointDownDomType && $(pointDownDomType).val() == 3) {
            let pointDownDomTranshipmentDom = document.querySelector(
                `${mainWrap} [data-wrap-trip=${tripId}] select[name=pointDown_transshipment]`
            );
            if (pointDownDomTranshipmentDom && $(pointDownDomTranshipmentDom).val()) {
                return $(pointDownDomTranshipmentDom).val();
            }
        }
        return null;
    }
    static getTransshipmentPrice(tripId, mainWrap) {
        let pointUpDom = document.querySelector(
            `${mainWrap} [data-wrap-trip=${tripId}] select[name=pointUp]`
        );
        let pointDownDom = document.querySelector(
            `${mainWrap} [data-wrap-trip=${tripId}] select[name=pointDown]`
        );
        let pointDownDomType = document.querySelector(
            `${mainWrap} [data-wrap-trip=${tripId}] select[name=pointDown_type]`
        );
        let pointUpDomType = document.querySelector(
            `${mainWrap} [data-wrap-trip=${tripId}] select[name=pointUp_type]`
        );
        let pointUpPrice = 0;
        let pointDownPrice = 0;
        if (pointUpDomType && $(pointUpDomType).val() == 3) {
            let pointUpDomTranshipmentDom = document.querySelector(
                `${mainWrap} [data-wrap-trip=${tripId}] select[name=pointUp_transshipment]`
            );
            if (
                pointUpDomTranshipmentDom.options[
                    pointUpDomTranshipmentDom.selectedIndex
                ]
            ) {
                pointUpPrice =
                    pointUpDomTranshipmentDom.options[
                        pointUpDomTranshipmentDom.selectedIndex
                    ].getAttribute("data-point-tsprice");
            }
        } else {
            if (pointUpDom.options[pointUpDom.selectedIndex]) {
                pointUpPrice =
                    pointUpDom.options[pointUpDom.selectedIndex].getAttribute(
                        "data-point-tsprice"
                    );
            }
        }
        if (pointDownDomType && $(pointDownDomType).val() == 3) {
            let pointDownTranshipmentDom = document.querySelector(
                `${mainWrap} [data-wrap-trip=${tripId}] select[name=pointDown_transshipment]`
            );
            if (
                pointDownTranshipmentDom.options[pointDownTranshipmentDom.selectedIndex]
            ) {
                pointDownPrice =
                    pointDownTranshipmentDom.options[
                        pointDownTranshipmentDom.selectedIndex
                    ].getAttribute("data-point-tsprice");
            }
        } else {
            if (pointDownDom.options[pointDownDom.selectedIndex]) {
                pointDownPrice =
                    pointDownDom.options[pointDownDom.selectedIndex].getAttribute(
                        "data-point-tsprice"
                    );
            }
        }

        // console.log(pointUpDom.options[ pointUpDom.selectedIndex ], pointDownDom.options[ pointDownDom.selectedIndex ], pointUpDom.selectedIndex, )

        return [Number(pointUpPrice), Number(pointDownPrice)];
    }

    bookingValidate(tripId) {
        let choosableSeat = $(
            `${this.mainWrap} [data-form-trip-id=${tripId}]`
        ).attr("data-trip-choosableseat");
        let seatsSelected = Booking.getSeatSelected(tripId, this.mainWrap);
        let fullname = $(
            `${this.mainWrap} [data-form-trip-id=${tripId}] input[name=full_name]`
        );
        let email = $(
            `${this.mainWrap} [data-form-trip-id=${tripId}] input[name=email]`
        );
        let phone = $(
            `${this.mainWrap} [data-form-trip-id=${tripId}] input[name=phone]`
        );
        let pointUp = $(
            `${this.mainWrap} [data-form-trip-id=${tripId}] select[name=pointUp]`
        );
        let pointDown = $(
            `${this.mainWrap} [data-form-trip-id=${tripId}] select[name=pointDown]`
        );
        let numberSeat = $(
            `${this.mainWrap} [data-form-trip-id=${tripId}] input[name=number_seat]`
        );
        let pointUpType = $(
            `${this.mainWrap} [data-form-trip-id=${tripId}] select[name=pointUp_type]`
        );
        let pointDownType = $(
            `${this.mainWrap} [data-form-trip-id=${tripId}] select[name=pointDown_type]`
        );
        let isRequiredEmail = $(
            `${this.mainWrap} [data-form-trip-id=${tripId}] input[name=useEmail]`
        );
        let pointUpTransshipment = $(
            `${this.mainWrap} [data-form-trip-id=${tripId}] select[name=pointUp_transshipment]`
        );
        let pointDownTransshipment = $(
            `${this.mainWrap} [data-form-trip-id=${tripId}] select[name=pointDown_transshipment]`
        );
        let pointUpRegionAddress = $(
            `${this.mainWrap} [data-form-trip-id=${tripId}] [name=pointUp_region_address]`
        );
        let pointDownRegionAddress = $(
            `${this.mainWrap} [data-form-trip-id=${tripId}] [name=pointDown_region_address]`
        );

        if (isRequiredEmail) {
            isRequiredEmail = isRequiredEmail.prop("checked");
        } else {
            isRequiredEmail = false;
        }

        if (!isRequiredEmail) {
            $(
                `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=email]`
            ).text("");
        }

        let statusAddressPU = true;

        let status = true;
        let statusSeat = true;
        let statusName = true;
        let statusPhone = true;
        let statusEmail = true;
        let statusPointUp = true;
        let statusPointDown = true;
        let statusPointUpRegion = true;
        let statusPointDownRegion = true;

        if (choosableSeat == 0) {
            if (numberSeat.val().trim() == "") {
                $(
                    `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=number_seat]`
                ).text(validateMsgs["vi"]["msg1"]);
                statusSeat = false;
            } else {
                $(
                    `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=number_seat]`
                ).text("");
                statusSeat = true;

                if (numberSeat.val() <= 0) {
                    $(
                        `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=number_seat]`
                    ).text(validateMsgs["vi"]["msg2"]);
                    statusSeat = false;
                }
            }
        } else {
            if (seatsSelected.trim() == "") {
                $(
                    `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=seat_selected]`
                ).text(validateMsgs["vi"]["msg3"]);
                // scrollTopToSelector($(`${this.mainWrap} [data-form-trip-id=${tripId}] label[for=seat_selected]`), 600,-80)
                statusSeat = false;
            } else {
                $(
                    `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=seat_selected]`
                ).text("");
                statusSeat = true;
            }
        }

        if (pointUp.val().trim() == "") {
            $(
                `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=pointUp]`
            ).text(validateMsgs["vi"]["msg4"]);
            statusPointUp = false;
        } else {
            $(
                `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=pointUp]`
            ).text("");
            statusPointUp = true;
        }

        if (pointDown.val().trim() == "") {
            $(
                `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=pointDown]`
            ).text(validateMsgs["vi"]["msg5"]);
            statusPointDown = false;
        } else {
            $(
                `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=pointDown]`
            ).text("");
            statusPointDown = true;
        }

        if (fullname.val().trim() == "") {
            $(
                `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=full_name]`
            ).text(validateMsgs["vi"]["msg6"]);
            statusName = false;
        } else {
            $(
                `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=full_name]`
            ).text("");
            statusName = true;
        }
        if (isRegionByLocation) {
            if (pointUpType.val() == 1) {
                if (pointUpRegionAddress.val().trim() == "") {
                    $(
                        `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=pointUpRegion]`
                    ).text("Vui lòng nhập điểm lên");
                    statusPointUpRegion = false;
                } else {
                    $(
                        `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=pointUpRegion]`
                    ).text("");
                    statusPointUpRegion = true;
                }
            } else {
                statusPointUpRegion = true;
            }
            if (pointDownType.val() == 1) {
                if (pointDownRegionAddress.val().trim() == "") {
                    $(
                        `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=pointDownRegion]`
                    ).text("Vui lòng nhập điểm xuống");
                    statusPointDownRegion = false;
                } else {
                    $(
                        `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=pointDownRegion]`
                    ).text("");
                    statusPointDownRegion = true;
                }
            } else {
                statusPointDownRegion = true;
            }
        } else {
            statusPointDownRegion = true;
            statusPointUpRegion = true;
        }
        let phoneNumberFormat =
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        if (phone.val().trim() == "") {
            $(
                `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=phone]`
            ).text(validateMsgs["vi"]["msg7"]);
            statusPhone = false;
        } else if (!phone.val().match(phoneNumberFormat)) {
            $(
                `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=phone]`
            ).text(validateMsgs["vi"]["msg21"]);
            statusPhone = false;
        }
        // else if(phone.val().length >= 12){
        //     $(`${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=phone]`).text(validateMsgs['vi']['msg8'])
        //     statusPhone = false;
        // }
        else {
            $(
                `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=phone]`
            ).text("");
            statusPhone = true;
        }

        let mailformat =
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


        if (isRequiredEmail) {
            if (email.val() == "") {
                // $(`${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=email]`).text(validateMsgs['vi']['msg9'])
                // statusEmail = false;
            } else if (!email.val().match(mailformat)) {
                $(
                    `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=email]`
                ).text(validateMsgs["vi"]["msg10"]);
                statusEmail = false;
            } else {
                $(
                    `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=email]`
                ).text("");
                statusEmail = true;
            }
        } else {
            if (email.val() == "") {} else if (!email.val().match(mailformat)) {
                $(
                    `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=email]`
                ).text(validateMsgs["vi"]["msg11"]);
                statusEmail = false;
            } else {
                $(
                    `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=email]`
                ).text("");
                statusEmail = true;
            }
        }

        if (pointUpType) {
            let pointUpAddress = $(
                `${this.mainWrap} [data-form-trip-id=${tripId}] [name=pointUp_address]`
            );

            if (
                pointUpAddress &&
                pointUpAddress.val() == "" &&
                (pointUpType.val() == 2 || pointUpType.val() == 1)
            ) {
                statusAddressPU = false;
                console.log("error");
                console.log(
                    $(
                        `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=pointUp]`
                    )
                );
                $(
                    `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=pointUp]`
                ).text(validateMsgs["vi"]["msg12"]);
            } else {
                statusAddressPU = true;
                $(
                    `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=pointUp]`
                ).text("");
            }

            if (
                pointUpTransshipment &&
                pointUpType.val() == 3 &&
                pointUpTransshipment.val() == ""
            ) {
                //Trung chuyển
                statusAddressPU = false;
                $(
                    `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=pointUp]`
                ).text(validateMsgs["vi"]["msg20"]);
            } else {
                statusAddressPU = true;
                $(
                    `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=pointUp]`
                ).text("");
            }
        }

        let statusAddressPD = true;

        if (pointDownType) {
            let pointDownAddress = $(
                `${this.mainWrap} [data-form-trip-id=${tripId}] [name=pointDown_address]`
            );
            if (
                pointDownAddress &&
                pointDownAddress.val() == "" &&
                (pointDownType.val() == 2 || pointDownType.val() == 1)
            ) {
                statusAddressPD = false;
                $(
                    `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=pointDown]`
                ).text(validateMsgs["vi"]["msg13"]);
            } else {
                statusAddressPD = true;
                $(
                    `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=pointDown]`
                ).text("");
            }

            if (
                pointDownTransshipment &&
                pointDownType.val() == 3 &&
                pointDownTransshipment.val() == ""
            ) {
                //Trung chuyển
                statusAddressPU = false;
                $(
                    `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=pointDown]`
                ).text(validateMsgs["vi"]["msg14"]);
            } else {
                statusAddressPU = true;
                $(
                    `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=pointDown]`
                ).text("");
            }
        }

        status =
            statusPointDownRegion &&
            statusPointUpRegion &&
            statusPointUp &&
            statusPointDown &&
            statusSeat & statusName & statusPhone & statusEmail &&
            statusAddressPD &&
            statusAddressPU;

        console.log("status ", status);
        return status;
    }

    initConfig() {
        let mainWrap = this.mainWrap;
        $(`${mainWrap} [data-action="useEmail"]`).change(function(event) {
            let tripId = $(event.currentTarget).attr("data-trip-id");
            console.log(
                $(`${mainWrap} [data-form-trip-id=${tripId}] [data-content="email"]`)
            );
            $(
                `${mainWrap} [data-form-trip-id=${tripId}] [data-content="email"]`
            ).toggleClass("disabled");
        });

        $(`${this.mainWrap} ${this.nextTabSelector}`).click((event) => {
            let tripId = $(event.currentTarget).attr("data-trip-id");

            $(
                `${this.mainWrap} [data-wrap-trip=${tripId}] [data-tab-content=seatMap]`
            ).toggle();
            $(
                `${this.mainWrap} [data-wrap-trip=${tripId}] [data-tab-content=userInfo]`
            ).toggle();
            $("html, body").animate({
                    scrollTop: $(`#userInfo${tripId}`).offset().top,
                },
                1000
            );
            // scrollTopToSelector($(`${this.mainWrap} [data-wrap-trip=${tripId}] [data-tab-content=userInfo]`), 800, '50px')
        });
    }

    getTicketInTrip(tripId, before = null, success = null, error = null) {
        let pointSelectedStr = Booking.getPointUpPointDown(tripId, this.mainWrap);

        let pointSelectedArr = pointSelectedStr.split(",");
        let mainWrapSelector = this.mainWrap;

        if (before != null) {
            before();
        }

        $.ajax({
            method: "POST",
            url: "/index.php?mod=datve&page=datve&sub=getTicketInTrip",
            data: {
                tripId: tripId,
                pointUpId: pointSelectedArr[0],
                pointDownId: pointSelectedArr[1],
            },
            success: function(data) {
                if (success != null) {
                    success(tripId, data.listTickets, mainWrapSelector);
                }

                // $(`${mainWrapSelector} [data-wrap-trip=${tripId}] .avseatmap`).toggleClass('loading')
            },
            error: function() {
                if (error != null) {
                    error();
                }
                // $(`${mainWrapSelector} [data-wrap-trip=${tripId}] .avseatmap`).toggleClass('loading')
            },
        });
    }
    static initExtraPrice(tripId, mainWrapSelector) {
        $(
            `${mainWrapSelector} [data-discount-trip=${tripId}] .discount-btn-submit`
        ).on("click", function() {
            const discountId = $(this).data("discount-customer-id");
            const discountType = $(this).data("discount-type");
            const discountAmount = $(this).data("discount-amount");
            const discountName = $(this).data("discount-name");
            if ($(this).hasClass("active")) {
                $(
                    `${mainWrapSelector} [data-wrap-trip=${tripId}] input[name=extraPrice]`
                ).val("");
                $(
                    `${mainWrapSelector} [data-wrap-trip=${tripId}] input[name=extraPriceType]`
                ).val("");
                $(
                    `${mainWrapSelector} [data-wrap-trip=${tripId}] input[name=extraPriceId]`
                ).val("");
                $(
                    `${mainWrapSelector} [data-wrap-trip=${tripId}] input[name=extraPriceName]`
                ).val("");
                $(this).text("Áp dụng").removeClass("active");
            } else {
                $(
                    `${mainWrapSelector} [data-wrap-trip=${tripId}] input[name=extraPrice]`
                ).val(discountAmount);
                $(
                    `${mainWrapSelector} [data-wrap-trip=${tripId}] input[name=extraPriceType]`
                ).val(discountType);
                $(
                    `${mainWrapSelector} [data-wrap-trip=${tripId}] input[name=extraPriceId]`
                ).val(discountId);
                $(
                    `${mainWrapSelector} [data-wrap-trip=${tripId}] input[name=extraPriceName]`
                ).val(discountName);
                $(this).text("Bỏ chọn").addClass("active");
            }
            let seatArray = Booking.getSeatSelected(tripId, mainWrapSelector).split(
                ","
            );

            if (seatArray.length == 1 && seatArray[0] == "") {
                seatArray = [];
            }
            SeatMapBuider.getListSeatPrice(tripId, seatArray, mainWrapSelector);
        });
    }
    static getDiscountInRoute(tripId, mainWrapSelector) {
        let routeId = Booking.getRouteIdOfTrip(tripId, mainWrapSelector);
        let phoneNumber = Booking.getPhoneNumber(tripId, mainWrapSelector);

        $.ajax({
            method: "POST",
            url: "/index.php?mod=datve&page=datve&sub=getDiscountCustomer",
            data: {
                routeId: routeId,
                phoneNumber: phoneNumber,
            },
            success: function(data) {
                const listDiscounts = data.listDiscounts;
                if (!listDiscounts || listDiscounts.length == 0) {
                    $(
                        `${mainWrapSelector} [data-discount-trip=${tripId}] .discount-btn-submit`
                    ).css("display", "none");
                }
                let html = ``;

                listDiscounts.forEach((discount) => {
                    html += `<div class="d-flex justify-content-between w-100 align-items-center discount-block">
              <div class="discount-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M226.4 100.56a12 12 0 0 0 9.6-11.75V64a12 12 0 0 0-12-12H32a12 12 0 0 0-12 12v24.81a12 12 0 0 0 9.6 11.75a28 28 0 0 1 0 54.88a12 12 0 0 0-9.6 11.75V192a12 12 0 0 0 12 12h192a12 12 0 0 0 12-12v-24.81a12 12 0 0 0-9.6-11.75a28 28 0 0 1 0-54.88M28 192v-24.81a4 4 0 0 1 3.2-3.91a36 36 0 0 0 0-70.56a4 4 0 0 1-3.2-3.91V64a4 4 0 0 1 4-4h60v136H32a4 4 0 0 1-4-4m168-64a36.09 36.09 0 0 0 28.8 35.28a4 4 0 0 1 3.2 3.91V192a4 4 0 0 1-4 4H100V60h124a4 4 0 0 1 4 4v24.81a4 4 0 0 1-3.2 3.91A36.09 36.09 0 0 0 196 128"></path></svg>            </div>
              <div class="">
                <div class="font-weight-bold">Ưu đãi giảm ${
                  discount.discountType == 1
                    ? discount.discountAmount + "%"
                    : discount.discountAmount + "VND"
                }</div>
                <div>${discount.discountName}</div>
              </div>
              <div class="discount-button">
                <button class="discount-btn-submit" data-submit-discount="${
                  tripId + discount.customerId
                }"
                  data-discount-customer-id="${discount.customerId}"
                  data-discount-type="${discount.discountType}"
                  data-discount-amount="${discount.discountAmount}"
                  data-discount-name="${discount.discountName}"
                >Áp dụng</button>
              </div>
            </div>`;
                });
                $(`${mainWrapSelector} [data-discount-trip=${tripId}]`).html(html);
                Booking.initExtraPrice(tripId, mainWrapSelector);
            },
            error: function(err) {
                $(
                    `${mainWrapSelector} [data-discount-trip=${tripId}] .discount-btn-submit`
                ).css("display", "none");
                console.log("Error", err);
            },
        });
    }
    getRandomSeats(seatAllow, listTickets, numberSeat, tripId) {
        let bookedSeats = [];
        listTickets.forEach((ticket) => {
            const seatIds = ticket.seatId.split(',');
            bookedSeats = bookedSeats.concat(seatIds)
        })
        let unbookedSeats = seatAllow.filter(seat => !bookedSeats.includes(seat));
        if (unbookedSeats.length < numberSeat) {
            $(
                `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=number_seat]`
            ).text("Số lượng ghế chọn không hợp lệ");
            return
        } else {
            $(
                `${this.mainWrap} [data-form-trip-id=${tripId}] label.error[for=number_seat]`
            ).text("");
        }
        let selectedSeats = unbookedSeats.slice(0, numberSeat);

        return selectedSeats;
    }
    initChangeNumberSeat() {
        $(`${this.mainWrap} input[name=number_seat]`).change((event) => {
            let tripId = $(event.currentTarget).attr("data-trip-id");
            let listTicketText = $(
                `${this.mainWrap} [data-form-trip-id=${tripId}] input[name=listTicket]`
            ).val();

            let seatAllowText = $(
                `${this.mainWrap} [data-form-trip-id=${tripId}] input[name=seat_allow]`
            ).val();
            const listTicket = JSON.parse(listTicketText || '{}');
            const seatAllow = seatAllowText.split(',');
            const numberSeatSelect = Number($(event.currentTarget).val())
            const selectSeat = this.getRandomSeats(seatAllow, listTicket, numberSeatSelect, tripId)

            SeatMapBuider.getListSeatPriceNoChoose(tripId, selectSeat, this.mainWrap)
        });
    }

    initCheckPromotion() {
        let mainWrap = this.mainWrap;
        // let currentPrice = Booking.getCurrentPrice(tripId, mainWrap)

        $(`${this.mainWrap} [data-action=checkPromotion]`).click((event) => {
            let tripId = $(event.currentTarget).attr("data-trip-id");
            let promotionCode = $(
                `${this.mainWrap} [data-form-trip-id=${tripId}] [name=promotionCode]`
            ).val();
            let routeId = $(
                `${this.mainWrap} [data-form-trip-id=${tripId}] [name=routeId]`
            ).val();
            let getInTimePlan = $(
                `${this.mainWrap} [data-form-trip-id=${tripId}] [name=getInTimePlan]`
            ).val();
            let priceNotPromo = Number(
                Booking.getPriceWithoudPromotion(tripId, mainWrap)
            );

            var priceShowed = 0;

            priceShowed = Number(priceNotPromo);

            console.log("Price " + priceShowed);

            let additionPriceForUserType = Booking.getAdditionPriceForUserType(
                tripId,
                mainWrap
            );
            additionPriceForUserType.forEach((value) => {
                if (value.type == 1) {
                    priceShowed = priceShowed + value.mode * value.amount;
                } else {
                    priceShowed =
                        priceShowed + (value.mode * value.amount * priceShowed) / 100;
                }
            });

            console.log("Price Show " + priceShowed);

            if (promotionCode.trim() == "") {
                toastr.warning(validateMsgs["vi"]["msg15"]);
                return;
            }

            let language = "vi";

            if (Booking.getSeatSelected(tripId, mainWrap) != "") {
                $.ajax({
                    method: "POST",
                    url: "/index.php?mod=datve&page=datve&sub=checkPromotion",
                    data: { routeId: routeId, promotionCode: promotionCode, getInTimePlan, tripId },
                    success: function(data) {
                        if (data.status) {
                            let newPrice = 0;
                            let pricePromo = 0;

                            if (data.data.price > 0) {
                                newPrice =
                                    priceShowed - data.data.price <= 0 ?
                                    0 :
                                    priceShowed - data.data.price;
                                pricePromo = data.data.price;
                            } else {
                                newPrice =
                                    priceShowed - data.data.percent * priceNotPromo <= 0 ?
                                    0 :
                                    priceShowed - data.data.percent * priceNotPromo;
                                pricePromo = data.data.percent * priceNotPromo;
                            }

                            Booking.setPricePromotion(tripId, mainWrap, pricePromo);
                            Booking.setPriceText(newPrice, tripId, mainWrap);
                            toastr.success(
                                `Bạn vừa được giảm ${Number(pricePromo).formatnum()} VND`
                            );
                        } else {
                            console.log("Language => " + language);

                            toastr.warning(validateMsgs[language]["msg16"]);
                        }
                    },
                    error: function() {},
                });
            } else {
                toastr.warning(validateMsgs[language]["msg17"]);
            }
        });
    }

    initEventSubmt() {
        $(`${this.mainWrap} ${this.toggleProcessBookingClass}`).click((event) => {
            let tripId = $(event.currentTarget).attr("data-trip-id");
            let choosableSeat = $(
                `${this.mainWrap} [data-form-trip-id=${tripId}]`
            ).attr("data-trip-choosableseat");

            if (!this.bookingValidate(tripId)) {
                return false;
            } else {
                if (choosableSeat == 0) {
                    let numberTicketAllow = 0;
                    let ticketBooked = [];
                    this.getTicketInTrip(
                        tripId,
                        () => {
                            $(`body`).toggleClass("loading");
                        },
                        (tripId, listTickets, mainWrap) => {
                            $(`body`).removeClass("loading");

                            listTickets.forEach((ticket) => {
                                if (ticket.ticketStatus == 2 || ticket.ticketStatus == 7) {
                                    ticketBooked.push(ticket.seat.seatId);
                                } else if (
                                    ticket.ticketStatus == 3 ||
                                    ticket.ticketStatus == 4 ||
                                    ticket.ticketStatus == 5
                                ) {
                                    ticketBooked.push(ticket.seat.seatId);
                                }
                            });
                            let allowSeatBeforeCheck = Booking.getAllowSeatBooking(
                                tripId,
                                this.mainWrap
                            );
                            let numberSeat = Number(
                                $(
                                    `${this.mainWrap} [data-form-trip-id=${tripId}] input[name=number_seat]`
                                )
                                .val()
                                .trim()
                            );

                            numberTicketAllow =
                                allowSeatBeforeCheck.length - ticketBooked.length;
                            if (numberSeat > numberTicketAllow) {
                                toastr.error(validateMsgs["vi"]["msg18"]);
                            } else {
                                let currentAllowSeat = allowSeatBeforeCheck.filter(
                                    (x) => !ticketBooked.includes(x)
                                );

                                let bookSeat = currentAllowSeat.slice(0, numberSeat);
                                $(
                                    `${this.mainWrap} [data-form-trip-id=${tripId}] input[name=seat_selected]`
                                ).val(bookSeat.toString());

                                $(`${this.mainWrap} [data-form-trip-id=${tripId}]`).submit();
                            }
                        },
                        () => {
                            $(`body`).removeClass("loading");
                        }
                    );
                    // let allowSeat = Booking.getAllowSeatBooking(tripId, this.mainWrap)
                } else {
                    $(
                        `${this.mainWrap} [data-form-trip-id=${tripId}] input[name=seat_selected]`
                    ).val(Booking.getSeatSelected(tripId, this.mainWrap));
                    // $(`${this.mainWrap} [data-form-trip-id=${tripId}] input[name=point_selected]`).val( Booking.getPointUpPointDown(tripId, this.mainWrap) );

                    $(`${this.mainWrap} [data-form-trip-id=${tripId}]`).submit();
                }
            }
        });
    }
}

class SeatMapBuider {
    constructor(config = {}) {
        this.config = config;

        config.mainWrapSelector ?
            (this.mainWrapSelector = config.mainWrapSelector) :
            (this.mainWrapSelector = "");
        config.toggleCreateMapClass ?
            (this.toggleCreateMapClass = config.toggleCreateMapClass) :
            (this.toggleCreateMapClass = "");

        this.initEnventSelectSeat();
        this.toggleCreateSeatMap();
    }

    initSeatMapToFirebase(database) {
        database.once("value").then(function(snapshot) {
            console.log("initSeatMapToFirebase");

            let data = snapshot.val();
            let seatMapAllowKey = [];
            if (data) {
                seatMapAllowKey = Object.keys(data).filter((key) => {
                    return (
                        data[key]["platform"].length > 0 &&
                        data[key]["platform"].includes(2)
                    );
                });
            }

            let seatMapLock = {};

            seatMapAllowKey.forEach((value) => {
                seatMapLock[value] = data[value];
            });

            Object.keys(seatMapLock).forEach((key) => {
                let value = seatMapLock[key];
                let totalSeatLock = value.seatList.length;
                $(`[data-content=totalEmptySeat][data-seatmap-id=${key}]`).each(
                    function(index, elem) {
                        let totaleEmptySeat = $(elem).attr("data-seat-empty");
                        $(elem).html(totaleEmptySeat - totalSeatLock);
                    }
                );
                value.seatList.forEach((seat) => {
                    let selector = `[data-seatmap-id=${key}][data-seat-col=${seat.column}][data-seat-row=${seat.row}][data-seat-floor=${seat.floor}][data-seat-id="${seat.seatId}"]`;
                    $(selector).html('<span class="avicon icon-seat-not-sell"></span>');
                    $(selector).attr("data-seat-status", "notSell");
                });
            });
        });
    }

    drawSeat(idTrip, seatData, mainWrapSelector) {
        seatData.forEach((ticket) => {
            let htmlSelector = `${mainWrapSelector} [data-trip-id=${idTrip}][data-seat-col=${ticket.seat.column}][data-seat-row=${ticket.seat.row}][data-seat-floor=${ticket.seat.floor}]`;
            if ($(htmlSelector).attr("data-seat-status") != "notSell") {
                if (ticket.ticketStatus == 0 || ticket.ticketStatus == 1) {
                    $(htmlSelector).html('<span class="avicon icon-seat-empty"></span>');
                    $(htmlSelector).attr("data-seat-status", "none");
                } else if (ticket.ticketStatus == 2 || ticket.ticketStatus == 7) {
                    $(htmlSelector).html('<span class="avicon icon-seat-booked"></span>');
                    $(htmlSelector).attr("data-seat-status", "booked");
                } else if (
                    ticket.ticketStatus == 3 ||
                    ticket.ticketStatus == 4 ||
                    ticket.ticketStatus == 5
                ) {
                    $(htmlSelector).html('<span class="avicon icon-seat-sold"></span>');
                    $(htmlSelector).attr("data-seat-status", "sold");
                }

                if (
                    ticket.ticketStatus == 2 && ticket.overTime > 0 &&
                    ticket.overTime < new Date().getTime()
                ) {
                    $(htmlSelector).html('<span class="avicon icon-seat-empty"></span>');
                    $(htmlSelector).attr("data-seat-status", "none");
                }
            }
        });
    }

    // loadTrip(tripId, callbackSuccess) {
    //     let pointSelectedStr = Booking.getPointUpPointDown(
    //         tripId,
    //         this.mainWrapSelector
    //     );
    //     let pointSelectedArr = pointSelectedStr.split(",");
    //     let mainWrapSelector = this.mainWrapSelector;
    //     $(`${mainWrapSelector} [data-wrap-trip=${tripId}] .avseatmap`).toggleClass(
    //         "loading"
    //     );
    //     $.ajax({
    //         method: "POST",
    //         url: "/index.php?mod=datve&page=datve&sub=getTicketInTrip",
    //         data: {
    //             tripId: tripId,
    //             pointUpId: pointSelectedArr[0],
    //             pointDownId: pointSelectedArr[1],
    //         },
    //         success: function(data) {
    //             const listTicketIds = (data ? .listTickets || []).map((item) => ({ seatId: item.listSeatId ? .join(','), ticketStatus: item.ticketStatus, overTime: item.overTime }));
    //             $(`${mainWrapSelector} [data-wrap-trip=${tripId}] [name="listTicket"]`).val(JSON.stringify(listTicketIds));
    //             callbackSuccess(tripId, data.listTickets, mainWrapSelector);
    //             $(
    //                 `${mainWrapSelector} [data-wrap-trip=${tripId}] .avseatmap`
    //             ).toggleClass("loading");
    //         },
    //         error: function() {
    //             $(
    //                 `${mainWrapSelector} [data-wrap-trip=${tripId}] .avseatmap`
    //             ).toggleClass("loading");
    //         },
    //     });
    // }

    toggleCreateSeatMap() {
        let mainWrapSelector = this.mainWrapSelector;
        $(`${this.mainWrapSelector} ${this.toggleCreateMapClass}`).click(
            (event) => {
                let tripId = $(event.currentTarget).attr("data-trip-id");
                let loaded = $(event.currentTarget).attr("data-trip-loaded");

                if (!loaded || loaded == "false") {
                    this.loadTrip(tripId, this.drawSeat);
                    Booking.getDiscountInRoute(tripId, mainWrapSelector);
                    $(event.currentTarget).attr("data-trip-loaded", "true");
                }
            }
        );
    }
    static getListSeatPriceNoChoose(tripId, seatArray, mainWrapSelector) {
        let totalPrice = 0;
        const params = {
            tripId: tripId,
            platform: 2,
            userType: 2,
            pointUpId: Booking.getPointUpVal(tripId, mainWrapSelector),
            pointDownId: Booking.getPointDownVal(tripId, mainWrapSelector),
        };
        const priceLocation = Booking.getSurchargePointLocation(
            tripId,
            mainWrapSelector
        );
        if (seatArray.length > 0) {
            const seatIds = [];
            const seatDetails = [];
            seatArray.forEach((item) => {
                seatIds.push(item);
                const seatDetail = {
                    seatId: item,
                    surcharge: Number(priceLocation.pointUp) + Number(priceLocation.pointDown),
                    transhipmentPointUpId: Booking.getTransshipmentUpId(
                        tripId,
                        mainWrapSelector
                    ),
                    transhipmentPointDownId: Booking.getTransshipmentDownId(
                        tripId,
                        mainWrapSelector
                    ),
                    companyRegionPointUpId: null,
                    companyRegionPointDownId: null,
                };
                if (seatArray.length == 1) {
                    seatDetail.discountValue = Booking.getExtraPrice(
                        tripId,
                        mainWrapSelector
                    );
                    seatDetail.discountType = Booking.getExtraPriceType(
                        tripId,
                        mainWrapSelector
                    );
                }
                seatDetails.push(seatDetail);
            });
            params.seatIds = seatIds;
            params.seatDetails = seatDetails;
            $.ajax({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                url: `${baseApiUrlV2}/partner/ticket/calculate-price`,
                data: JSON.stringify(params),
                success: function(data) {
                    const prices = data.results.seatPrice;
                    for (let key in prices) {
                        totalPrice += Number(prices[key]);
                    }
                    let listTransshipmentPrice = Booking.getTransshipmentPrice(
                        params.tripId,
                        mainWrapSelector
                    );
                    let totalTransshipmentPrice =
                        listTransshipmentPrice[0] + listTransshipmentPrice[1];

                    totalPrice += totalTransshipmentPrice;
                    Booking.setPriceText(
                        totalPrice < 0 ? 0 : totalPrice,
                        params.tripId,
                        mainWrapSelector
                    );
                    $(`${this.mainWrapSelector} [data-form-trip-id=${tripId}] input[name=price]`).val(
                        totalPrice
                    );
                },
                error: function() {
                    if (error != null) {
                        error();
                    }
                },
            });
        }
    }
    static getListSeatPrice(tripId, seatArray, mainWrapSelector) {
        let htmlSeats = "";
        let totalPrice = 0;
        const params = {
            tripId: tripId,
            platform: 2,
            userType: 2,
            pointUpId: Booking.getPointUpVal(tripId, mainWrapSelector),
            pointDownId: Booking.getPointDownVal(tripId, mainWrapSelector),
        };
        const priceLocation = Booking.getSurchargePointLocation(
            tripId,
            mainWrapSelector
        );
        if (seatArray.length > 0) {
            const seatIds = [];
            const seatDetails = [];
            seatArray.forEach((item) => {
                htmlSeats += `<span>${item}</span>`;
                seatIds.push(item);
                const seatDetail = {
                    seatId: item,
                    surcharge: Number(priceLocation.pointUp) + Number(priceLocation.pointDown),
                    transhipmentPointUpId: Booking.getTransshipmentUpId(
                        tripId,
                        mainWrapSelector
                    ),
                    transhipmentPointDownId: Booking.getTransshipmentDownId(
                        tripId,
                        mainWrapSelector
                    ),
                    companyRegionPointUpId: null,
                    companyRegionPointDownId: null,
                };
                if (seatArray.length == 1) {
                    seatDetail.discountValue = Booking.getExtraPrice(
                        tripId,
                        mainWrapSelector
                    );
                    seatDetail.discountType = Booking.getExtraPriceType(
                        tripId,
                        mainWrapSelector
                    );
                }
                seatDetails.push(seatDetail);
            });
            if (seatArray.length > 1) {
                $(
                    `${mainWrapSelector} [data-wrap-trip=${tripId}] [data-discount-trip=${tripId}]`
                ).css("display", "none");
            } else {
                $(
                    `${mainWrapSelector} [data-wrap-trip=${tripId}] [data-discount-trip=${tripId}]`
                ).css("display", "block");
            }
            params.seatIds = seatIds;
            params.seatDetails = seatDetails;
            $.ajax({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                url: `${baseApiUrlV2}/partner/ticket/calculate-price`,
                data: JSON.stringify(params),
                success: function(data) {
                    const prices = data.results.seatPrice;
                    for (let key in prices) {
                        totalPrice += Number(prices[key]);
                    }
                    let listTransshipmentPrice = Booking.getTransshipmentPrice(
                        params.tripId,
                        mainWrapSelector
                    );
                    let totalTransshipmentPrice =
                        listTransshipmentPrice[0] + listTransshipmentPrice[1];

                    totalPrice += totalTransshipmentPrice;

                    $(
                        `${mainWrapSelector} [data-wrap-trip=${params.tripId}] [data-content=listSeat]`
                    ).html(htmlSeats);
                    $(
                        `${mainWrapSelector} [data-wrap-trip=${params.tripId}] [data-content=totalSeat]`
                    ).text(params.seatIds.length);

                    let pricePromo = Booking.getPricePromotion(
                        params.tripId,
                        mainWrapSelector
                    );

                    let totalPriceWithPromo =
                        totalPrice - pricePromo < 0 ? 0 : totalPrice - pricePromo;

                    let priceShowed = totalPriceWithPromo;
                    let additionPriceForUserType = Booking.getAdditionPriceForUserType(
                        params.tripId,
                        mainWrapSelector
                    );

                    additionPriceForUserType.forEach((value) => {
                        if (value.type == 1) {
                            priceShowed =
                                priceShowed + value.mode * value.amount * seatArray.length;
                        } else {
                            priceShowed =
                                priceShowed + value.mode * value.amount * priceShowed;
                        }
                    });
                    Booking.setPriceText(
                        priceShowed < 0 ? 0 : priceShowed,
                        params.tripId,
                        mainWrapSelector
                    );
                    Booking.setPriceWithoudPromotion(
                        params.tripId,
                        mainWrapSelector,
                        totalPrice
                    );
                },
                error: function() {
                    if (error != null) {
                        error();
                    }
                },
            });
        } else {
            $(
                `${mainWrapSelector} [data-wrap-trip=${params.tripId}] [data-content=listSeat]`
            ).html(htmlSeats);
            $(
                `${mainWrapSelector} [data-wrap-trip=${params.tripId}] [data-content=totalSeat]`
            ).text(0);
            let pricePromo = Booking.getPricePromotion(
                params.tripId,
                mainWrapSelector
            );

            let totalPriceWithPromo =
                totalPrice - pricePromo < 0 ? 0 : totalPrice - pricePromo;

            let priceShowed = totalPriceWithPromo;
            let additionPriceForUserType = Booking.getAdditionPriceForUserType(
                params.tripId,
                mainWrapSelector
            );

            additionPriceForUserType.forEach((value) => {
                if (value.type == 1) {
                    priceShowed =
                        priceShowed + value.mode * value.amount * seatArray.length;
                } else {
                    priceShowed = priceShowed + value.mode * value.amount * priceShowed;
                }
            });

            Booking.setPriceText(
                priceShowed < 0 ? 0 : priceShowed,
                params.tripId,
                mainWrapSelector
            );
            Booking.setPriceWithoudPromotion(
                params.tripId,
                mainWrapSelector,
                totalPrice
            );
        }
    }

    static reCalculateSeatPrice(tripId, mainWrapSelector) {
        let totalPrice = 0;
        const params = {
            tripId: tripId,
            platform: 2,
            userType: 2,
            pointUpId: Booking.getPointUpVal(tripId, mainWrapSelector),
            pointDownId: Booking.getPointDownVal(tripId, mainWrapSelector),
        };
        let seatArray = Booking.getSeatSelected(tripId, mainWrapSelector).split(
            ","
        );
        const priceLocation = Booking.getSurchargePointLocation(
            tripId,
            mainWrapSelector
        );
        if (seatArray.length > 0) {
            const seatIds = [];
            const seatDetails = [];
            seatArray.forEach((item) => {
                seatIds.push(item);
                const seatDetail = {
                    seatId: item,
                    surcharge: Number(priceLocation.pointUp) + Number(priceLocation.pointDown),
                    transhipmentPointUpId: Booking.getTransshipmentUpId(
                        tripId,
                        mainWrapSelector
                    ),
                    transhipmentPointDownId: Booking.getTransshipmentDownId(
                        tripId,
                        mainWrapSelector
                    ),
                    companyRegionPointUpId: null,
                    companyRegionPointDownId: null,
                };
                if (seatArray.length == 1) {
                    seatDetail.discountValue = Booking.getExtraPrice(
                        tripId,
                        mainWrapSelector
                    );
                    seatDetail.discountType = Booking.getExtraPriceType(
                        tripId,
                        mainWrapSelector
                    );
                }
                seatDetails.push(seatDetail);
            });
            if (seatArray.length > 1) {
                $(
                    `${mainWrapSelector} [data-wrap-trip=${tripId}] [data-discount-trip=${tripId}]`
                ).css("display", "none");
            } else {
                $(
                    `${mainWrapSelector} [data-wrap-trip=${tripId}] [data-discount-trip=${tripId}]`
                ).css("display", "block");
            }
            params.seatIds = seatIds;
            params.seatDetails = seatDetails;
            $.ajax({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                url: `${baseApiUrlV2}/partner/ticket/calculate-price`,
                data: JSON.stringify(params),
                success: function(data) {
                    const prices = data.results.seatPrice;
                    for (let key in prices) {
                        totalPrice += Number(prices[key]);
                    }
                    let listTransshipmentPrice = Booking.getTransshipmentPrice(
                        params.tripId,
                        mainWrapSelector
                    );
                    let totalTransshipmentPrice =
                        listTransshipmentPrice[0] + listTransshipmentPrice[1];

                    totalPrice += totalTransshipmentPrice;

                    let pricePromo = Booking.getPricePromotion(
                        params.tripId,
                        mainWrapSelector
                    );

                    let totalPriceWithPromo =
                        totalPrice - pricePromo < 0 ? 0 : totalPrice - pricePromo;

                    let priceShowed = totalPriceWithPromo;
                    let additionPriceForUserType = Booking.getAdditionPriceForUserType(
                        params.tripId,
                        mainWrapSelector
                    );

                    additionPriceForUserType.forEach((value) => {
                        if (value.type == 1) {
                            priceShowed =
                                priceShowed + value.mode * value.amount * seatArray.length;
                        } else {
                            priceShowed =
                                priceShowed + value.mode * value.amount * priceShowed;
                        }
                    });
                    Booking.setPriceText(
                        priceShowed < 0 ? 0 : priceShowed,
                        params.tripId,
                        mainWrapSelector
                    );
                    Booking.setPriceWithoudPromotion(
                        params.tripId,
                        mainWrapSelector,
                        totalPrice
                    );
                },
                error: function() {
                    if (error != null) {
                        error();
                    }
                },
            });
        }
    }
    static reCalculateSeatPriceNoChooseAble(tripId, mainWrapSelector) {
        const numberSeat = $(
            `${mainWrapSelector} [data-form-trip-id=${tripId}] input[name=number_seat]`
        ).val();
        let basePrice =
            Number(
                $(
                    `${mainWrapSelector} [data-form-trip-id=${tripId}] [name=base_price]`
                ).val()
            ) || 0;
        const priceLocation = Booking.getSurchargePointLocation(
            tripId,
            mainWrapSelector
        );
        const price =
            Number(numberSeat) *
            (basePrice +
                Number(priceLocation.pointUp) +
                Number(priceLocation.pointDown));
        $(
            `${mainWrapSelector} [data-form-trip-id=${tripId}] [data-content=totalPrice]`
        ).html(Number(price).formatnum());
        $(
            `${mainWrapSelector} [data-form-trip-id=${tripId}] input[name=price]`
        ).val(price);
    }

    initEnventSelectSeat() {
        $(document).on(
            "click",
            `${this.mainWrapSelector} [data-seat-id]`,
            (event) => {
                let checker = $(event.currentTarget).attr("data-seat-status");
                let tripId = $(event.currentTarget).attr("data-trip-id");

                let numberSeatSelected = $(
                    `${this.mainWrapSelector} [data-wrap-trip=${tripId}] [data-seat-status=selected]`
                ).length;

                if (numberSeatSelected == 6) {
                    $(
                        `${this.mainWrapSelector} [data-wrap-trip=${tripId}] label.error[for=seat_selected]`
                    ).text(validateMsgs["vi"]["msg19"]);
                }

                if (numberSeatSelected < 6) {
                    if (checker == "none") {
                        $(event.currentTarget).attr("data-seat-status", "selected");
                        $(event.currentTarget).html(
                            '<div class="avicon icon-seat-selected"></div>'
                        );
                    }
                    $(
                        `${this.mainWrapSelector} [data-wrap-trip=${tripId}] label.error[for=seat_selected]`
                    ).text("");
                }

                if (checker == "selected") {
                    $(event.currentTarget).attr("data-seat-status", "none");
                    $(event.currentTarget).html(
                        `<div class="avicon icon-seat-empty"></div><span class="showSeatId">${$(
                event.currentTarget
              ).attr("data-seat-id")}</span>`
                    );
                }

                numberSeatSelected = $(
                    `${this.mainWrapSelector} [data-wrap-trip=${tripId}] [data-seat-status=selected]`
                ).length;

                // Booking.calcPrice(tripId, this.mainWrapSelector);
                let seatArray = Booking.getSeatSelected(
                    tripId,
                    this.mainWrapSelector
                ).split(",");

                if (seatArray.length == 1 && seatArray[0] == "") {
                    seatArray = [];
                }
                SeatMapBuider.getListSeatPrice(
                    tripId,
                    seatArray,
                    this.mainWrapSelector
                );
                let dataCallback = {};
                dataCallback.tripId = tripId;
                dataCallback.valid = numberSeatSelected > 0 && numberSeatSelected <= 6;

                this.config.doWhenSelectSeat ?
                    this.config.doWhenSelectSeat(dataCallback) :
                    "";
            }
        );
    }

    static getSeatPrice(tripId, mainWrap) {
        let seatArray = Booking.getSeatSelected(tripId, mainWrap).split(",");

        if (seatArray.length == 1 && seatArray[0] == "") {
            seatArray = [];
            return 0;
        }

        let basePrice =
            Number(
                $(`${mainWrap} [data-wrap-trip=${tripId}] input[name=base_price]`).val()
            ) || 0;
        let totalPrice = 0;

        seatArray.forEach((item) => {
            let extraPrice =
                Number(
                    $(`${mainWrap} [data-seat-id="${item}"]`).attr("data-extra-price")
                ) || 0;
            console.log("extraPrice Get " + extraPrice);
            let priceSeatWithExtra = extraPrice + basePrice;

            totalPrice += priceSeatWithExtra;
        });

        return Number(totalPrice);
    }
}

$(document).ready(function() {
    $("#js-intro__slide").owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 4,
            },
        },
    });
});

// var owl = $('.owl-carousel');
// owl.owlCarousel();

// $('.owl-next').click(function() {
//     owl.trigger('next.owl.carousel');
// })

// $('.owl-prev').click(function() {
//     owl.trigger('prev.owl.carousel', [300]);
// })

// --------------------------------------------------------------------------------------------

// var mybutton = document.querySelector('.btn-scroll-top');

// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }
// }

// mybutton.onclick = function(){
//     document.body.scrollTop = 0;
//     document.documentElement.scrollTop = 0;
// }

// -------------------------------------------------------------------------------------------

// document.querySelector('.content-check-big-size').style.display = 'none';

// $('.input_checkbox').change(function(){
//     let wrap = $(this).attr('data-target');

//     $(`[data-wrap=${wrap}]`).toggle();

//     // $(this).parent().css("margin-bottom","19px");
// })

class UserLogin {
    constructor(config = {}) {
        this.initEventLogin();
        this.initEventOtp();
        this.toggleEventLoginPopup();
        this.token = "";
    }
    static updateGcaptchaToken(token) {
        this.token = token;
    }
    static getInputOtp() {
        let otp = "";
        $(".digit-group")
            .find("input")
            .each(function() {
                otp += $(this).val();
            });
        return otp;
    }
    static getOTP() {
        const phoneNumber = $("#phoneNumber").val();
        if (!this.token) {
            $(`#login-errormes`).text("Vui lòng verify captcha");
            $(`#login-errormes`).css("display", "block");
            return;
        }
        let phoneNumberFormat =
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        $(`#login-errormes`).css("display", "none");
        if (!phoneNumber.match(phoneNumberFormat)) {
            $(`#login-errormes`).text("Số điện thoại không đúng! Vui lòng thử lại");
            $(`#login-errormes`).css("display", "block");
            return;
        }
        $(`#login-loading`).css("display", "block");
        $.ajax({
            method: "POST",
            url: `${baseApiUrlV1}/user/sendOTP`,
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                phoneNumber: phoneNumber,
                companyId: companyId,
                stateCode: "84",
            }),
            success: function(data) {
                if (data.code == 200) {
                    $("input[name=login_step]").val(2);
                    $("#otp-form-group").css("display", "block");
                }
                $(`#login-loading`).css("display", "none");
            },
            error: function() {
                $(`#login-loading`).css("display", "none");
            },
        });
    }

    static login() {
        const phoneNumber = $("#phoneNumber").val();
        const otp = UserLogin.getInputOtp();
        $(`#login-errormes`).css("display", "none");
        if (!this.token) {
            $(`#login-errormes`).text("Vui lòng verify captcha");
            $(`#login-errormes`).css("display", "block");
            return;
        }
        if (!otp) {
            $(`#login-errormes`).text("Mã OTP không được để trống!");
            $(`#login-errormes`).css("display", "block");
            return;
        }
        $(`#login-loading`).css("display", "block");
        $.ajax({
            method: "POST",
            url: `/api/user-login`,
            data: {
                phoneNumber: phoneNumber,
                otp: otp,
                stateCode: "84",
            },
            success: function(data) {
                if (data.code == 200) {
                    window.location.reload();
                } else {
                    $(`#login-errormes`).text("Lỗi đăng nhập! Vui lòng thử lại sau!");
                    $(`#login-errormes`).css("display", "block");
                }
                $(`#login-loading`).css("display", "none");
            },
            error: function(err) {
                const message = JSON.parse(err.responseText || "{}");
                $(`#login-errormes`).text(
                    message.msg || "Lỗi đăng nhập! Vui lòng thử lại sau!"
                );
                $(`#login-errormes`).css("display", "block");
                $(`#login-loading`).css("display", "none");
            },
        });
    }

    static logout() {
        $.ajax({
            method: "POST",
            url: `/api/user-logout`,
            data: {
                logout: true,
            },
            success: function(data) {
                window.location.reload();
            },
            error: function() {
                console.log("logout that bai");
            },
        });
    }
    toggleEventLoginPopup() {
        $("#userLoginDesktop").click(function(event) {
            event.preventDefault();
            $("#loginmodal").modal("show");
        });
        $("#userLoginMobile").click(function(event) {
            event.preventDefault();
            $("#loginmodal").modal("show");
        });
    }
    initEventOtp() {
        $(".digit-group")
            .find("input")
            .each(function() {
                $(this).attr("maxlength", 1);
                $(this).on("keyup", function(e) {
                    var parent = $($(this).parent());

                    if (e.keyCode === 8 || e.keyCode === 37) {
                        var prev = parent.find("input#" + $(this).data("previous"));

                        if (prev.length) {
                            $(prev).select();
                        }
                    } else if (
                        (e.keyCode >= 48 && e.keyCode <= 57) ||
                        (e.keyCode >= 65 && e.keyCode <= 90) ||
                        (e.keyCode >= 96 && e.keyCode <= 105) ||
                        e.keyCode === 39
                    ) {
                        var next = parent.find("input#" + $(this).data("next"));

                        if (next.length) {
                            $(next).select();
                        }
                    }
                });
            });
    }

    initEventLogin() {
            $(".loginbtn").click(function(event) {
                event.preventDefault();
                const login_step = $("input[name=login_step]").val();
                if (login_step == 1) {
                    UserLogin.getOTP();
                } else {
                    UserLogin.login();
                }
            });

            $(".user_logout").click(function(event) {
                event.preventDefault();
                UserLogin.logout();
            });
        }
        // static getListSeatPrice(tripId, seatArray, mainWrapSelector) {
        //   let htmlSeats = "";
        //   let totalPrice = 0;
        //   const params = {
        //     tripId: tripId,
        //     platform: 2,
        //     userType: 2,
        //     pointUpId: Booking.getPointUpVal(tripId, mainWrapSelector),
        //     pointDownId: Booking.getPointDownVal(tripId, mainWrapSelector),
        //   };
        //   if (seatArray.length > 0) {
        //     const seatIds = [];
        //     const seatDetails = [];
        //     seatArray.forEach((item) => {
        //       htmlSeats += `<span>${item}</span>`;
        //       seatIds.push(item);
        //       const seatDetail = {
        //         seatId: item,
        //         surcharge: 0,
        //         transhipmentPointUpId: Booking.getTransshipmentUpId(
        //           tripId,
        //           mainWrapSelector
        //         ),
        //         transhipmentPointDownId: Booking.getTransshipmentDownId(
        //           tripId,
        //           mainWrapSelector
        //         ),
        //         companyRegionPointUpId: null,
        //         companyRegionPointDownId: null,
        //       };
        //       seatDetails.push(seatDetail);
        //     });
        //     params.seatIds = seatIds;
        //     params.seatDetails = seatDetails;
        //     $.ajax({
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       url: `${baseApiUrlV2}/partner/ticket/calculate-price`,
        //       data: JSON.stringify(params),
        //       success: function (data) {
        //         const prices = data.results.seatPrice;
        //         for (let key in prices) {
        //           totalPrice += Number(prices[key]);
        //         }
        //         let listTransshipmentPrice = Booking.getTransshipmentPrice(
        //           params.tripId,
        //           mainWrapSelector
        //         );
        //         let totalTransshipmentPrice =
        //           listTransshipmentPrice[0] + listTransshipmentPrice[1];

    //         totalPrice += totalTransshipmentPrice;

    //         $(
    //           `${mainWrapSelector} [data-wrap-trip=${params.tripId}] [data-content=listSeat]`
    //         ).html(htmlSeats);
    //         $(
    //           `${mainWrapSelector} [data-wrap-trip=${params.tripId}] [data-content=totalSeat]`
    //         ).text(params.seatIds.length);

    //         let pricePromo = Booking.getPricePromotion(
    //           params.tripId,
    //           mainWrapSelector
    //         );

    //         let totalPriceWithPromo =
    //           totalPrice - pricePromo < 0 ? 0 : totalPrice - pricePromo;

    //         let priceShowed = totalPriceWithPromo;
    //         let additionPriceForUserType = Booking.getAdditionPriceForUserType(
    //           params.tripId,
    //           mainWrapSelector
    //         );

    //         additionPriceForUserType.forEach((value) => {
    //           if (value.type == 1) {
    //             priceShowed =
    //               priceShowed + value.mode * value.amount * seatArray.length;
    //           } else {
    //             priceShowed =
    //               priceShowed + value.mode * value.amount * priceShowed;
    //           }
    //         });
    //         Booking.setPriceText(
    //           priceShowed < 0 ? 0 : priceShowed,
    //           params.tripId,
    //           mainWrapSelector
    //         );
    //         Booking.setPriceWithoudPromotion(
    //           params.tripId,
    //           mainWrapSelector,
    //           totalPrice
    //         );
    //       },
    //       error: function () {
    //         if (error != null) {
    //           error();
    //         }
    //       },
    //     });
    //   } else {
    //     $(
    //       `${mainWrapSelector} [data-wrap-trip=${params.tripId}] [data-content=listSeat]`
    //     ).html(htmlSeats);
    //     $(
    //       `${mainWrapSelector} [data-wrap-trip=${params.tripId}] [data-content=totalSeat]`
    //     ).text(0);
    //     let pricePromo = Booking.getPricePromotion(
    //       params.tripId,
    //       mainWrapSelector
    //     );

    //     let totalPriceWithPromo =
    //       totalPrice - pricePromo < 0 ? 0 : totalPrice - pricePromo;

    //     let priceShowed = totalPriceWithPromo;
    //     let additionPriceForUserType = Booking.getAdditionPriceForUserType(
    //       params.tripId,
    //       mainWrapSelector
    //     );

    //     additionPriceForUserType.forEach((value) => {
    //       if (value.type == 1) {
    //         priceShowed =
    //           priceShowed + value.mode * value.amount * seatArray.length;
    //       } else {
    //         priceShowed = priceShowed + value.mode * value.amount * priceShowed;
    //       }
    //     });
    //     Booking.setPriceText(
    //       priceShowed < 0 ? 0 : priceShowed,
    //       params.tripId,
    //       mainWrapSelector
    //     );
    //     Booking.setPriceWithoudPromotion(
    //       params.tripId,
    //       mainWrapSelector,
    //       totalPrice
    //     );
    //   }
    // }

    // initEnventSelectSeat() {
    //   $(document).on(
    //     "click",
    //     `${this.mainWrapSelector} [data-seat-id]`,
    //     (event) => {
    //       let checker = $(event.currentTarget).attr("data-seat-status");
    //       let tripId = $(event.currentTarget).attr("data-trip-id");

    //       let numberSeatSelected = $(
    //         `${this.mainWrapSelector} [data-wrap-trip=${tripId}] [data-seat-status=selected]`
    //       ).length;

    //       if (numberSeatSelected == 6) {
    //         $(
    //           `${this.mainWrapSelector} [data-wrap-trip=${tripId}] label.error[for=seat_selected]`
    //         ).text(validateMsgs[this.lang]["msg19"]);
    //       }

    //       if (numberSeatSelected < 6) {
    //         if (checker == "none") {
    //           $(event.currentTarget).attr("data-seat-status", "selected");
    //           $(event.currentTarget).html(
    //             '<div class="avicon icon-seat-selected"></div>'
    //           );
    //         }
    //         $(
    //           `${this.mainWrapSelector} [data-wrap-trip=${tripId}] label.error[for=seat_selected]`
    //         ).text("");
    //       }

    //       if (checker == "selected") {
    //         $(event.currentTarget).attr("data-seat-status", "none");
    //         $(event.currentTarget).html(
    //           `<div class="avicon icon-seat-empty"></div><span class="showSeatId">${$(
    //             event.currentTarget
    //           ).attr("data-seat-id")}</span>`
    //         );
    //       }

    //       numberSeatSelected = $(
    //         `${this.mainWrapSelector} [data-wrap-trip=${tripId}] [data-seat-status=selected]`
    //       ).length;

    //       // Booking.calcPrice(tripId, this.mainWrapSelector);
    //       let seatArray = Booking.getSeatSelected(
    //         tripId,
    //         this.mainWrapSelector
    //       ).split(",");

    //       if (seatArray.length == 1 && seatArray[0] == "") {
    //         seatArray = [];
    //       }
    //       SeatMapBuider.getListSeatPrice(
    //         tripId,
    //         seatArray,
    //         this.mainWrapSelector
    //       );
    //       let dataCallback = {};
    //       dataCallback.tripId = tripId;
    //       dataCallback.valid = numberSeatSelected > 0 && numberSeatSelected <= 6;

    //       this.config.doWhenSelectSeat
    //         ? this.config.doWhenSelectSeat(dataCallback)
    //         : "";
    //     }
    //   );
    // }
}