using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using AuthServer.Repository;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using IdentityServer4.Validation;
using IdentityServer4.Services;
using AuthServer.Configuration;
using AuthServer.Interface;
using Microsoft.AspNetCore.Identity;
using AuthServer.Models;
using IdentityServer4.Services.Default;

namespace AuthServer
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                    .SetBasePath(env.ContentRootPath)
                    .AddJsonFile("appsettings.json", true, true)
                    .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            var migrationsAssembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;

            services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseSqlServer(connectionString)
            );

            //services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            //{
            //    builder.AllowAnyOrigin()
            //           .AllowAnyMethod()
            //           .AllowAnyHeader();
            //}));

            services.AddTransient<IResourceOwnerPasswordValidator, ResourceOwnerPasswordValidator>()
                    .AddTransient<IProfileService, ProfileService>()
                    .AddTransient<IAuthRepository, AuthRepository>()
                    .AddTransient<IPasswordHasher<User>, PasswordHasher<User>>();
            
            services.AddIdentityServer()
                .AddTemporarySigningCredential()
                .AddInMemoryClients(Config.GetClients())
                .AddInMemoryScopes(Config.GetScopes());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseCors("MyPolicy");

            app.UseIdentityServer();

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Hello World!");
            });
        }
    }
}
