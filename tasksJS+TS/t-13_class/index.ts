interface WorkTime {
  from: string
  till: string
}

class CarService {
  static DefaultWorkingHours = {
    from: '9:00',
    till: '18:00',
  }
  name: string
  workingHours: WorkTime

  constructor(name: string, workingHours?: WorkTime) {
    this.name = name
    this.workingHours = workingHours || CarService.DefaultWorkingHours
  }
  repairCar(carName?: string): void {
    if (!carName) {
      console.error(
        'Вам необходимо указать название машины, чтобы ее отремонтировать',
      )
      return
    }

    const currentTime = new Date()
    const currentHours = currentTime.getHours()
    const workingHoursFrom = Number(this.workingHours.from.split(':')[0])
    const workingHoursTill = Number(this.workingHours.till.split(':')[0])

    if (currentHours < workingHoursFrom || currentHours > workingHoursTill) {
      console.log('workingHoursFrom', workingHoursFrom)

      alert(`К сожалению, мы сейчас закрыты. Приходите завтра`)
    } else {
      alert(`Сейчас отремонтируем вашу машину ${carName} ! Ожидайте пожалуйста`)
      console.log('workingHoursFrom', workingHoursFrom)
    }
  }
}

const carService = new CarService('RepairCarNow', {
  from: ' 10:00',
  till: '18:00',
})
carService.repairCar('BMW')
