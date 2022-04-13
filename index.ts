import { exit } from "process";
import readline from "readline";
import notifer from "node-notifier";

require("dotenv").config();

const WORK_ICON_PATH = "./assets/work.png";
const REST_ICON_PATH = "./assets/rest.png";

const convertMinutesNumber = (minutes: any): number => {
  const num = Number(minutes);
  return !isNaN(num) ? num : 0;
};

const notify = (message: string, iconPath: string) => {
  notifer.notify({
    title: "ポモドーロタイマー",
    message,
    icon: iconPath,
    sound: convertMinutesNumber(process.env.IS_NOTIFICATION_SOUND) === 1,
    wait: false,
  });
};

const stdoutMessage = (message: string) => {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(message);
};

const main = () => {
  const workMinutes =
    convertMinutesNumber(process.env.WORK_MINUTES) > 0
      ? convertMinutesNumber(process.env.WORK_MINUTES)
      : 25;

  const restMinutes =
    convertMinutesNumber(process.env.REST_MINUTES) > 0
      ? convertMinutesNumber(process.env.REST_MINUTES)
      : 5;

  const term =
    convertMinutesNumber(process.env.TERM) > 0
      ? convertMinutesNumber(process.env.TERM)
      : 3;

  let sumSeconds = 1;
  let sumMinutes = 0;
  let termCount = 1;
  let isWork = true;
  let preMessage = "作業中";
  let preMessageColor = "\x1b[31m";
  let iconPath = WORK_ICON_PATH;

  setInterval(() => {
    if (!isWork && termCount > term) {
      exit(0);
    }

    if (sumSeconds === 60) {
      sumSeconds = 0;
      sumMinutes++;
    }

    if (isWork) {
      if (sumMinutes === workMinutes) {
        preMessage = "休憩中";
        preMessageColor = "\x1b[32m";
        isWork = false;
        sumMinutes = 0;
        termCount++;
        iconPath = REST_ICON_PATH;

        if (termCount > term) {
          // 先に通知
          notify("ポモドーロ終了", REST_ICON_PATH);
          stdoutMessage("ポモドーロ終了");
        } else {
          notify("休憩開始", iconPath);
        }
      } else if (workMinutes === sumMinutes + 1 && sumSeconds === 30) {
        notify("作業 残り30秒", WORK_ICON_PATH);
      }
    } else {
      if (sumMinutes === restMinutes) {
        preMessage = "作業中";
        preMessageColor = "\x1b[31m";
        isWork = true;
        sumMinutes = 0;
        iconPath = WORK_ICON_PATH;

        notify("作業開始", iconPath);
      } else if (restMinutes === sumMinutes + 1 && sumMinutes === 30) {
        notify("休憩 残り30秒", REST_ICON_PATH);
      }
    }

    const message =
      sumMinutes !== 0
        ? `${preMessageColor}${preMessage}\u001b[0m ${sumMinutes}分${sumSeconds}秒`
        : `${preMessageColor}${preMessage}\u001b[0m ${sumSeconds}秒`;

    stdoutMessage(message);

    sumSeconds++;
  }, 1000);
};

main();
