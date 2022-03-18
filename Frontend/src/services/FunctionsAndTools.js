
export const checkDates = (startDate, endDate, language, t) => {
    if (checkIfEqual(startDate, endDate)) {
        return (formatDate(startDate, language)
            + ' | '
            + formatAMPM(startDate, language))
    }
    else {
        return t('Events.from')
            + ' '
            + (formatDate(startDate, language)
                + ' | '
                + formatAMPM(startDate, language)
                + '\n'
                + t('Events.to')
                + ' '
                + formatDate(endDate, language)
                + ' | '
                + formatAMPM(endDate, language))
    }
}
export const checkIfEqual = (startDate, endDate) => {
    const sDate = new Date(startDate.split('T')[0])
    const eDate = new Date(endDate.split('T')[0])
    return sDate.getDate() === eDate.getDate() &&
        sDate.getMonth() === eDate.getMonth() &&
        sDate.getFullYear() === eDate.getFullYear()
}
export const formatAMPM = (dateValue, language) => {
    let date = new Date(dateValue)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let ampm = hours >= 12 ? (language === 'fr' ? 'soir' : (language === 'ar' ? 'مساءاً' : 'pm')) : (language === 'fr' ? 'matin' : (language === 'ar' ? 'صباحاً' : 'am'))
    hours = hours % 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? '0' + minutes : minutes
    let Time = hours + ':' + minutes + ' ' + ampm
    return Time;
}
export const formatDate = (theDate, lang) => {
    const monthsEnglish = {
        0: 'Jan',
        1: 'Feb',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'Aug',
        8: 'Sept',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec',
    }
    const daysEnglish = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const monthsFrench = {
        0: 'Janv',
        1: 'Févr',
        2: 'Mars',
        3: 'Avr',
        4: 'Mai',
        5: 'Juin',
        6: 'Juil',
        7: 'Aout',
        8: 'Sept',
        9: 'Oct',
        10: 'Nov',
        11: 'Déc',
    }
    const daysFrench = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']

    const monthsArabic = {
        0: 'كانون 2',
        1: 'شباط',
        2: 'آذار',
        3: 'نيسان',
        4: 'أيار',
        5: 'حزيران',
        6: 'تموز',
        7: 'آب',
        8: 'أيلول',
        9: 'تشرين 1',
        10: 'تشرين 2',
        11: 'كانون 1',
    }
    const daysArabic = ['الآحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']

    let d = String(theDate).split('T')
    d = new Date(d[0])
    const year = d.getFullYear()
    const date = d.getDate()
    const monthIndex = d.getMonth()

    let monthName = monthsEnglish[monthIndex]
    let dayName = daysEnglish[d.getDay()]
    let formatted = `${dayName}, ${date} ${monthName} ${year}`
    if (lang === "fr") {
        monthName = monthsFrench[monthIndex]
        dayName = daysFrench[d.getDay()]
        formatted = `${dayName}, ${date} ${monthName} ${year}`
    }
    else if (lang === "ar") {
        monthName = monthsArabic[monthIndex]
        dayName = daysArabic[d.getDay()]
        formatted = `${dayName}، ${monthName} ${date}، ${year}`
    }
    return formatted.toString()
}

export const email_validate = (email) => {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) === false) {
        return (false);
    }
    else
        return true;
}

export const isValidURL = (string) => {
    let res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
}