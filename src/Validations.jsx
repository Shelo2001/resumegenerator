function nameAndSurnameValidation(name) {
  const georgian = /^[ა-ჰ]+$/g
  if (!name) {
    return false
  } else if (name.length < 2) {
    return 'მინიმუმ 2 ასო'
  } else if (!georgian.test(name)) {
    return 'მხოლოდ ქართული ასოები'
  } else {
    return ''
  }
}

const emailValidation = (email) => {
  if (!email) {
    return false
  } else if (!email.endsWith('@redberry.ge')) {
    return 'მეილი უნდა მთავრდებოდეს @redberry.ge-ით'
  } else {
    return ''
  }
}

const phoneValidation = (phoneNumber) => {
  if (!phoneNumber) {
    return false
  } else if (!phoneNumber.startsWith('+995')) {
    return 'ტელეფონის ნომრის ველი უნდა იწყებოდეს +995'
  } else if (phoneNumber.length !== 13) {
    return 'ქართული ტელეფონის ნომერი'
  } else {
    return ''
  }
}

export { nameAndSurnameValidation, emailValidation, phoneValidation }
