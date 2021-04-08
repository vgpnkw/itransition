using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Linq;

namespace itransition_game
{
    class Program
    {
        private static byte[] Key(int size)
        {
            using (var gnr = RandomNumberGenerator.Create())
            {
                var key = new byte[size];
                gnr.GetBytes(key);
                return key;
            }
        }
        static bool CheckCountArguments(int len)
        {
            if (len < 3 || len % 2 == 0 )
            {
                Console.WriteLine("You have entered less than 3 or an even number of arguments");
                return false;
            }
            return true;
        }
        static bool CheckUniqueArguments(string[] args)
        {
            if (args.Distinct().Count() != args.Length) 
            {
                Console.WriteLine("Arguments must not be repeated");
                return false;
            }
            else return true;
        }
        static void Main(string[] args)
        {
            int len = args.Length;

            if(!CheckCountArguments(len)) return;
            if(!CheckUniqueArguments(args)) return;

            int min = 1, max = len;
            int userMove;
            int compMove = RandomNumberGenerator.GetInt32(min, max);
            byte[] key = Key(16);

            using (var sha3 = new HMACSHA256(key))
            {
                sha3.ComputeHash(Encoding.Default.GetBytes(compMove.ToString()));
                Console.WriteLine("HMAC: {0}", BitConverter.ToString(sha3.Hash).Replace("-", string.Empty)); 
            }
            while (true)
            {
                Console.WriteLine("Your choice:");
                for (int i = 0; i < len; i++)
                {
                    Console.WriteLine("{0} - {1}", i +1, args[i]);
                }
                Console.WriteLine("0 - exit");
                Console.Write("Enter your choice: ");
                if (Int32.TryParse(Console.ReadLine(), out userMove))
                {
                    if (userMove > len || userMove < 0)
                    {
                        Console.WriteLine("Read carefully!");
                        continue;
                    }
                    break;
                }
            }
            if (userMove == 0)
            {
                return;
            }
            Console.WriteLine("Your choice: {0} \nComputer choice: {1}", args[userMove - 1], args[compMove - 1]);
            int half = len / 2;
            if (userMove > compMove && userMove - compMove <= half || userMove < compMove && compMove - userMove >= half)
            {
                Console.WriteLine("You Win");
            }      
            else if (userMove == compMove)
            {
                Console.WriteLine("Draw");
            }
            else
            {
                Console.WriteLine("You Lose");
            }
            Console.WriteLine("HMAC key: {0}", BitConverter.ToString(key).Replace("-", string.Empty));
        }
    }
}
