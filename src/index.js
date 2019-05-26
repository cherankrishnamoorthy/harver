const { getRandomWordSync, getRandomWord } = require('word-maker');
const fs = require('fs');

const logger = (text) => {
	fs.appendFile('harver_test.txt', `${text}\n` , (err) => {
	  if (err) throw err;
	});
}

const loggerSync = (text) => {
	fs.appendFileSync('harver_test.txt', `${text}\n`);
}

/*
* 1. Print numbers from 1 to 100 to the console, 
* but for each number also print a random word
* using the function `getRandomWordSync`
*/

const test1 = () => {

	loggerSync("\n\n-- Test 1 --\n\n");
	for( let a = 1; a <= 100; a++ ){
		const word = getRandomWordSync({withErrors: false});
		//console.log(a+". "+word);
		loggerSync(`${a} ${word}`)
	}

}

try{
	test1();
}catch(err){
	console.log(err);
}


/*
* 2. Modify your code to be a "Fizz Buzz" program. 
* That is, print the numbers as in the previous step, 
* but for multiples of three, print "Fizz" (instead of the random word), 
* for multiples of five, print "Buzz" and for numbers which are both multiples of three and five, print "FizzBuzz".
*/

const test2 =  () => {

	loggerSync("\n\n-- Test 2 --\n\n");
	for( let a = 1; a <= 100; a++ ){

		let word    = '';
		const fizz  = 'FIZZ';
		const buzz  = 'BUZZ';

		if( (a % 3) === 0) word = fizz;
		if( (a % 5) === 0) word += buzz;
		
		if(word){
			//console.log(a+". "+word);
			loggerSync(`${a} ${word}`);
		}

	}
}

try{
	test2();
}catch(err){
	console.log(err);
}

/* 
* 3. Create a version of steps *1* and *2* using the **asynchronous** function, 
* `getRandomWord`. This function returns a Promise, which resolves to a random word string. 
* The numbers may or may not be in numerical order.
*/


const test3 =  async () => {

	await logger("\n\n-- Test 3 --\n\n");

	for( let a = 1; a <= 100; a++ ){

			const word = await getRandomWord();

			await logger(`${a} ${word}`);
		
	}
}

//I purposfully ignored the error handling inside the func as below code is the same with error handling


/* 
* 4. Add error handling to both the synchronous and asynchronous solutions 
* (calling `getRandomWord({ withErrors: true })` will intermitently throw 
* an error instead of return a random word). When an error is caught, 
* the programm should print "Doh!" instead of the random word, "Fizz", "Buzz" or "FizzBuzz"
*/


const test4 =  async () => {

	await logger("\n\n-- Test 4 --\n\n");
	for( let a = 1; a <= 100; a++ ){

		await getRandomWord({ withErrors: true }).
		then(async (word) => {
			//console.log(a+". "+word);
			await logger(`${a} ${word}`);
		}).
		catch(async () => {
			//console.log(a + ". " + 'Doh!');
			await logger(`${a} Doh!`);
		})
		

	}
}

try{

	(async () =>{
		await test3();
		await test4();
	})();

}catch(err){
	console.log(err);
}




