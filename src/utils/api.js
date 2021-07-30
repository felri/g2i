// todo: use .env or https://alxmrtnz.com/thoughts/2019/03/12/environment-variables-and-workflow-in-expo.html
const API_URL = 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean'

export async function fetchQuestions() {
  const data = {
    data: null,
    error: null
  }
  try {
    const response = await fetch(API_URL);
    if(response.ok) {
      data.data = await response.json();
    } else {
      data.error = true;
    }
  } catch (error) {
    data.error = true;
  } finally {
    return data;
  }
}
