﻿using AuthServer.Interface;
using IdentityModel;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AuthServer.Configuration
{
    public class ProfileService: IProfileService
    {
        private IAuthRepository _repository;

        public ProfileService(IAuthRepository rep)
        {
            this._repository = rep;
        }

        public Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            try
            {
                var subjectId = context.Subject.GetSubjectId();
                var user = _repository.GetUserById(new Guid(subjectId));

                var claims = new List<Claim>
            {
                new Claim(JwtClaimTypes.Subject, user.Id.ToString()),
				//add as many claims as you want!new Claim(JwtClaimTypes.Email, user.Email),new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean)
			};

                context.IssuedClaims = claims;
                return Task.FromResult(0);
            }
            catch (Exception x)
            {
                return Task.FromResult(0);
            }
        }

        public Task IsActiveAsync(IsActiveContext context)
        {
            var user = _repository.GetUserById(new Guid(context.Subject.GetSubjectId()));
            context.IsActive = (user != null) && user.Active;
            return Task.FromResult(0);
        }
    }
}
