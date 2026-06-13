# Contributing to AIops

Thank you for your interest in contributing to AIops! We welcome contributions from everyone. This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions with other contributors and maintainers.

## Getting Started

### 1. Fork the Repository
```bash
git clone https://github.com/YOUR-USERNAME/AIops.git
cd AIops
```

### 2. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

Use descriptive branch names:
- `feature/add-prometheus-integration`
- `bugfix/fix-alert-correlation`
- `docs/update-setup-guide`

### 3. Set Up Development Environment
```bash
npm install
npm run dev
```

## Development Guidelines

### Code Style
- Use ESLint configuration provided
- Format code with Prettier: `npm run format`
- Use TypeScript for type safety
- Follow naming conventions:
  - `camelCase` for variables and functions
  - `PascalCase` for classes and components
  - `UPPER_SNAKE_CASE` for constants

### Commit Messages
Write clear, descriptive commit messages:
```
feat: add Prometheus integration
fix: resolve alert correlation bug
docs: update API documentation
refactor: improve incident detection logic
test: add tests for anomaly detection
```

Format: `<type>: <short description>`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build, dependencies, tooling

### Testing
- Write tests for new features
- Ensure all tests pass: `npm run test`
- Aim for >80% code coverage
- Test both happy path and edge cases

```bash
npm run test                  # Run all tests
npm run test:watch          # Watch mode
npm run test:coverage       # Coverage report
```

## Pull Request Process

### Before Submitting
1. Update your branch with latest main: `git pull origin main`
2. Run tests: `npm run test`
3. Run linter: `npm run lint`
4. Format code: `npm run format`
5. Update documentation if needed

### Submitting a PR
1. Push your branch: `git push origin feature/your-feature`
2. Create a Pull Request on GitHub
3. Fill out the PR template with:
   - Clear description of changes
   - Related issues (if any)
   - Testing instructions
   - Screenshots (if UI changes)

### PR Guidelines
- Keep PRs focused on a single feature/fix
- Keep commits atomic and logical
- Add meaningful commit messages
- Reference related issues using #issue-number
- Request review from maintainers

### PR Review Checklist
- [ ] Code follows project style guide
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No console.log or debug code
- [ ] No security vulnerabilities
- [ ] Performance impact considered

## Issue Reporting

### Bug Reports
Include:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Environment (OS, Node version, etc.)
- Screenshots/logs if applicable

### Feature Requests
Include:
- Clear description of the feature
- Use case and motivation
- Proposed implementation (if any)
- Alternatives considered

## Project Structure

```
AIops/
├── backend/          # Express.js API
├── frontend/         # React dashboard
├── config/           # Configuration
├── docs/             # Documentation
└── .github/          # GitHub Actions & templates
```

## Areas to Contribute

### Backend
- Metrics collection integrations
- Incident detection algorithms
- Alert routing logic
- Runbook execution engine
- ML model improvements

### Frontend
- Dashboard UI components
- Real-time updates
- Visualization improvements
- User experience enhancements

### Documentation
- API documentation
- Integration guides
- Deployment instructions
- Troubleshooting guides

### DevOps
- CI/CD improvements
- Docker configuration
- Kubernetes manifests
- Performance optimization

## Questions?

- 📖 Check [Documentation](./docs)
- 💬 Open a Discussion
- 🐛 Check existing Issues
- 📧 Contact maintainers

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

Thank you for contributing to AIops! 🎉
