using GetAHotel.Context;
using GetAHotel.DTO;
using GetAHotel.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GetAHotel.Controllers.OAuth2
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IPasswordHasher<AspNetUser> _passwordHasher;
        private readonly JwtSettings _jwtSettings;

        public AuthController(AppDbContext context, IOptions<JwtSettings> jwtSettings)
        {
            _context = context;
            _jwtSettings = jwtSettings.Value;
            _passwordHasher = new PasswordHasher<AspNetUser>();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerdto)
        {
            if (await _context.AspNetUsers.AnyAsync(u => u.Email == registerdto.Email))
                return BadRequest("Este correo ya está en uso");

            var user = new AspNetUser
            {
                UserName = registerdto.Name,
                Email = registerdto.Email,
            };

            user.PasswordHash = _passwordHasher.HashPassword(user, registerdto.Password);

            _context.AspNetUsers.Add(user);
            await _context.SaveChangesAsync();

            return Ok("Usuario Registrado");
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _context.AspNetUsers
                           .FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null ||
                _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password)
                != PasswordVerificationResult.Success)
            {
                return Unauthorized("Credenciales Inválidas");
            }

            var token = GenerateJwtToken(user);

            return Ok(new
            {
                token,
                user = new
                {
                    id = user.Id,
                    name = user.UserName   // o user.Email si preferís
                }
            });
        }

        private string GenerateJwtToken(AspNetUser user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim("name", user.UserName),
        };

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwtSettings.ExpirationMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


    }
}

