module.exports = function getZerosCount(number, base) {
  
  

  let muls = getMultipliers(base);

  let p = muls[0];
  let q = muls[1];

  let zeroCount = 0;
  let minZeroCount = 0;
  let pow = 1;
  let K = 0;
  /*
  Для каждого pi^qi делаем следующее:
  Применяем формулу Лежандра для того, чтобы узнать сколько раз pi входит в M!
  Делим эту величину на qi целочисленным делением. Получаем ci.
  Минимальное ci полученное в этом цикле - это и есть искомое количество нулей.
  */
  for (let i = 0; i < p.length; i++) {
    do {
      K = Math.trunc(number / Math.pow(p[i], pow));
      zeroCount += K;
      pow++;
    } while(K > 1)
    
    zeroCount = Math.trunc(zeroCount / q[i]);

    if (minZeroCount == 0 || zeroCount < minZeroCount) {
      minZeroCount = zeroCount;
    }

    zeroCount = 0;
    pow = 1;
  }

  

  return minZeroCount;
}

//решето Эратосфена
function getPrimes(number) {

  let arr = Array.from({length: number + 1}, (v, k) => true);

  var p = 2;
  let i = 0;

  let result = []

  do {
    
      for (i = p * p; i < number; i += p) {
          arr[i] = false;
      }

      
      for (i = p + 1; i < number; i++) {
          if (arr[i]) {
              break;
          }
      }

      p = i;
  } while (p * p < number);

  for (let i = 2; i < arr.length; i++) {
      if (arr[i]) result.push(i);
  }

  return result;
}

//факторизуем основание системы счисления - N = p1^q1 * p2^q2 * ... * pk^qk 
function getMultipliers(number) {

  let primes = getPrimes(number);

  let p = [], q =[];
  
  let i = 0;

  while (number != 1 ) {
   
    if (number % primes[i] == 0) {
      
      if (p[p.length -1] != primes[i]) {
        p.push(primes[i]);
        q.push(1);
      } else {
        q[q.length - 1]++;
      }
      number /= primes[i];

    } else {
      i++;
    }
  }
  
  return [p, q];
}