export default function ($scope) {
      const monthsStr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      $scope.months = monthsStr;
      $scope.allPay = [];
      $scope.amount = 1000;
      $scope.intRate = 8;
      $scope.terms = 36;
      let today = new Date();
      $scope.years = Array.from(Array(100).keys()).map((i, ind) => today.getFullYear() + ind);
      $scope.monthselected = monthsStr[today.getMonth()];
      $scope.selectedYear = today.getFullYear();
      $scope.calc = function () {
        if (Number($scope.amount) > 0) {
          let dateToStartWith = new Date($scope.selectedYear, monthsStr.indexOf($scope.monthselected), 1);
          $scope.allPay = amort_calc($scope.amount, $scope.intRate, $scope.terms, dateToStartWith);
        } else {
          $scope.allPay = [];
        }
      };



      function calculateAmortagationSch(amortAmount, pricipalAmount, rate, date, collection = []) {
        let dateObject = date == undefined ? date = new Date() : date;
        let dateStr = monthsStr[date.getMonth()] + ' ' + date.getFullYear();
        let interst = pricipalAmount * rate;
        let pricipal = amortAmount - interst;
        let balance = (pricipalAmount - pricipal);
        let balanceValue = 0;

        if (balance > 0) {
          balanceValue = Math.ceil(balance);
        }
        collection.push({
          dateStr,
          intRate: Math.ceil(interst),
          pricipalAmt: Math.ceil(pricipal),
          balanceValue
        });

        dateObject = new Date(date.setMonth(date.getMonth() + 1));
        if (balance > -1) calculateAmortagationSch(amortAmount, balance, rate, dateObject, collection);
        
        return collection;
      }

      /** 
       * 
       * @param {int} p Pricipal Amount 
       * @param {float} r Rate in percent 
       * @param {int} n months 
       * */
      function amort_calc(p, r, n, date) {
        //http://www.mathportal.org/calculators/financial-calculators/amortization-calculator.php     
        r = (Math.pow((1 + (r / 100)), (1 / 12))) - 1;
        let a = (p * r) / (1 - Math.pow(((1 + r)), -(n)));
        let data = calculateAmortagationSch(a, p, r, date);
        //console.table(data);
        return data;
      }
    }