using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.Models;

namespace AuthServer
{
    public class Config
    {
        public static IEnumerable<Scope> GetScopes()
        {
            return new List<Scope>
            {
                StandardScopes.OfflineAccess,
                new Scope
                {
                    Name = "api1",
                    Description = "My API",
                    IncludeAllClaimsForUser = true
                }
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                //new Client
                //{
                //    ClientId = "google",
                //    ClientSecrets =
                //    {
                //        new Secret("secret".Sha256())
                //    },
                //    AllowedGrantTypes = GrantTypes.List("googleAuth"),

                //    AllowedScopes =
                //    {
                //       "offline_access",
                //        "api1"
                //    }
                //},
                new Client
                {
                    ClientId = "resourceOwner",
                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                    AllowedCorsOrigins = new List<string>
                    {
                        "http://localhost:3000"
                    },
                    AllowedScopes =
                    {
                        "offline_access",
                        "api1"
                    }
                }
            };
        }
        
    }
}
