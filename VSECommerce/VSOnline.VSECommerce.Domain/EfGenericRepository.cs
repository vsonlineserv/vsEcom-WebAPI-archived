////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce.Domain ResultSet
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Linq.Expressions;
using VSOnline.VSECommerce.Persistence;
using System.Data.Entity.Validation;
using System.Data.OleDb;

namespace VSOnline.VSECommerce.Domain
{
    /// <summary>
    /// http:/ /codefizzle.wordpress.com/2012/07/26/correct-use-of-repository-and-unit-of-work-patterns-in-asp-net-mvc/
    /// </summary>
    /// <typeparam name="T"></typeparam>

    public class EfGenericRepository<T> : IGenericRepository<T>
                                      where T : class
    {
        private readonly DbSet<T> _dbSet;        

        public EfGenericRepository(DbSet<T> dbSet)
        {                      
            _dbSet = dbSet;
        }

        #region IGenericRepository<T> implementation

        public virtual IQueryable<T> AsQueryable()
        {
            return _dbSet.AsQueryable();
        }

        public IEnumerable<T> GetAll()
        {
            return _dbSet;
        }

        public IEnumerable<T> Find(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.Where(predicate);
        }

        public IEnumerable<T> Find(Expression<Func<T, bool>> predicate, Expression<Func<T, object>> includePath) 
        {
            return _dbSet.Where(predicate).Include(includePath);
        }

        public IEnumerable<T> Find(Expression<Func<T, bool>> predicate, Expression<Func<T, object>> includePath,Expression<Func<T, object>> includePath2)
        {
            return _dbSet.Where(predicate).Include(includePath).Include(includePath2);
        }

        public IEnumerable<T> Find(Expression<Func<T, bool>> predicate, Expression<Func<T, object>> includePath, Expression<Func<T, object>> includePath2,
            Expression<Func<T, object>> includePath3)
        {
            return _dbSet.Where(predicate).Include(includePath).Include(includePath2).Include(includePath3);
        }

        public IEnumerable<T> Find(Expression<Func<T, bool>> predicate, Expression<Func<T, object>> includePath, Expression<Func<T, object>> includePath2,
            Expression<Func<T, object>> includePath3, Expression<Func<T, object>> includePath4)
        {
            return _dbSet.Where(predicate).Include(includePath).Include(includePath2).Include(includePath3).Include(includePath4);
        }

 
        #endregion


        public T Single(Expression<Func<T, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public T SingleOrDefault(Expression<Func<T, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public T First(Expression<Func<T, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public T GetById(int id)
        {
            throw new NotImplementedException();
        }

        public void Add(T entity)
        {
            _dbSet.Add(entity);             
        }

        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
        }

        public void Attach(T entity)
        {
            _dbSet.Attach(entity);            
        }
        
    }
}
