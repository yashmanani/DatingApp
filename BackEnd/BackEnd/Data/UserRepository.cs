using AutoMapper;
using AutoMapper.QueryableExtensions;
using BackEnd.DTOs;
using BackEnd.Interfaces;
using BackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Data
{
    public class UserRepository : IUserRepository
    {
        public DataContext _DbContext { get; }
        public IMapper _Mapper { get; }

        public UserRepository(DataContext dataContext, IMapper mapper)
        {
            _DbContext = dataContext;
            _Mapper = mapper;
        }
        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _DbContext.Users.FindAsync(id);
        }

        public async Task<User?> GetUserByUsernameAsync(string username)
        {
            return await _DbContext.Users
                .Include(x => x.Photos)
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _DbContext.Users
                .Include(x => x.Photos)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _DbContext.SaveChangesAsync() > 0;
        }

        public void Update(User user)
        {
            _DbContext.Entry(user).State = EntityState.Modified;
        }

        public async Task<IEnumerable<MemberDto>> GetMembersAsync()
        {
            return await _DbContext.Users
                .ProjectTo<MemberDto>(_Mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<MemberDto?> GetMemberByUsernameAsync(string username)
        {
            return await _DbContext.Users
               .Where(x => x.UserName == username)
               .ProjectTo<MemberDto>(_Mapper.ConfigurationProvider)
               .SingleOrDefaultAsync();
        }
    }
}
