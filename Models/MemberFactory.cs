using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace react_abundant_azure.Models
{
    public class MemberFactory
    {
        public class SignUpData
        {
            public string Username { get; set; }
            public string Password { get; set; }
            public string Email { get; set; }
            public string Phone { get; set; }
            public string FacebookId { get; set; }
            public string LineId { get; set; }
        }

        public byte[] Password_Hashed(string password, out byte[] out_salt)
        {
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);

            byte[] salt = new byte[30];
            RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
            rng.GetBytes(salt);

            byte[] password_hashed_concat_salt = passwordBytes.Concat(salt).ToArray();

            byte[] password_with_salt = SHA512.Create().ComputeHash(password_hashed_concat_salt);

            out_salt = salt;

            return password_with_salt;
        }
    }
}
