export default formValues => {
  console.log(formValues)
  const errors = {}
  if (!formValues.Header) {
    errors.Header = 'You must enter a Header'
  }
  if (!formValues.Sub) {
    errors.Sub = 'You must enter a Sub'
  }
  if (!formValues.description) {
    errors.description = 'You must enter a Description'
  }
  if (!formValues.task || !formValues.task.length) {
    errors.task = { _error: 'At least one task must be entered' }
  } else {
    console.log(formValues.task)
    const tasksArrayErrors = []
    formValues.task.map((task, Index) => {
      const taskErrors = {}
      if (!task || !task.input) {
        taskErrors.input = 'Required'
        tasksArrayErrors[Index] = taskErrors
      }
      if (!task || !task.output) {
        taskErrors.output = 'Required'
        tasksArrayErrors[Index] = taskErrors
      }
    })
    if (tasksArrayErrors.length) {
      errors.task = tasksArrayErrors
    }
    console.log(tasksArrayErrors)
  }
  console.log(errors)
  return errors
}
