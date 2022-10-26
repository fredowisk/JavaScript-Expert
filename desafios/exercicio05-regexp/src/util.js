import safeRegex from 'safe-regex';

export default function evaluateRegex(regex) {
  const isValid = safeRegex(regex);

  if(!isValid) throw new Error(`The regex [${regex}] is unsafe!`);

  return regex;
}